import { Component, OnInit } from '@angular/core';
import { UseSession } from 'src/app/util/useSession';
import { MemberService } from './service/member.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { MemberResponse } from './domain/member_response';
import { MemberRequest } from './domain/member_request';
import { ScheduleResponse } from '../schedule-name/domain/schedule_response';
import { NotificationService } from 'src/app/components/notification/notification.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  public schedule: ScheduleResponse;
  public useSession: UseSession;
  public members: MemberResponse[] = [];
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

  deletarMembro(member: any): void {
    console.log(member);
  }
}
