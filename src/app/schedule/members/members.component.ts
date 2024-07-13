import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import { ScheduleResponse } from '../schedule-name/domain/schedule_response';
import { MemberRequest } from './domain/member_request';
import { MemberResponse } from './domain/member_response';
import { MemberSchedule } from './domain/member_schedule';
import { MemberService } from './service/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  public members: MemberResponse[] = [];
  public memberSchedule!: MemberSchedule;
  public schedule: ScheduleResponse;
  public useSession: UseSession;
  public member: MemberRequest;

  constructor(
    private service: MemberService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.member = new MemberRequest();
    this.useSession = new UseSession();
    this.schedule = this.useSession.getScheduleId();
    this.member.scheduleId = this.schedule.id;
  }

  ngOnInit(): void {
    this.listMember();
    this.listAllMembers();
  }

  listMember(): void {
    this.loaderService.show();
    this.service.listMember(this.schedule.id).subscribe(
      (res) => {
        this.memberSchedule = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  listAllMembers(): void {
    this.loaderService.show();
    this.service.list(this.schedule.id).subscribe(
      (res) => {
        this.members = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  save(): void {
    if (this.isValidMember()) {
      this.loaderService.show();
      this.service.save(this.member).subscribe(
        (res) => {
          this.ngOnInit();
          this.member = new MemberRequest();
          this.loaderService.hide();
          this.notificationService.showSuccess(
            'Membro adicionado com sucesso!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Membro não cadastrado por favor tente novamente.'
          );
        }
      );
    }
  }

  isValidMember(): boolean {
    if (
      this.member.email != null &&
      this.member.type != null &&
      this.member.phone != null &&
      this.member.nickname != null
    ) {
      return true;
    }
    this.notificationService.showError(
      'Preencha todos os campos e tente novamente.'
    );
    return false;
  }

  deletarMembro(member: MemberResponse): void {
    if (confirm('Deseja deletar o membro: ' + member.member.nickname)) {
      this.loaderService.show();
      this.service.delete(member.id).subscribe(
        (res) => {
          const index = this.members.indexOf(member);
          this.members.splice(index, 1);
          this.loaderService.hide();
          this.notificationService.showSuccess('Membro deletada com sucesso!');
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Membro não deletada por favor tente novamente.'
          );
        }
      );
    }
  }
}
