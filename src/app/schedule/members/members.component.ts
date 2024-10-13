import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import { ScheduleResponse } from '../schedule-name/domain/schedule_response';
import { MemberRequest } from './domain/member_request';
import { MemberResponse } from './domain/member_response';
import { MemberSchedule } from './domain/member_schedule';
import { MemberService } from './service/member.service';
import { MemberType } from './domain/member';
import label from 'src/assets/i18n/label';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
})
export class MembersComponent implements OnInit {
  // public members: MemberResponse[] = [];
  public memberSchedule!: MemberSchedule;
  public schedule: ScheduleResponse;
  public useSession: UseSession;
  public member: MemberRequest;
  public label = label;

  members: MemberResponse[] = [
    {
      id: 'r1',
      member: {
        id: '1',
        phone: '111-111-1111',
        email: 'member1@example.com',
        type: MemberType.CREATOR,
        nickname: 'CreatorOne',
      },
      nickname: 'CreatorOne',
    },
    {
      id: 'r2',
      member: {
        id: '2',
        phone: '222-222-2222',
        email: 'member2@example.com',
        type: MemberType.EDITOR,
        nickname: 'EditorOne',
      },
      nickname: 'EditorOne',
    },
    {
      id: 'r3',
      member: {
        id: '3',
        phone: '333-333-3333',
        email: 'member3@example.com',
        type: MemberType.VIEWER,
        nickname: 'ViewerOne',
      },
      nickname: 'ViewerOne',
    },
    {
      id: 'r4',
      member: {
        id: '4',
        phone: '444-444-4444',
        email: 'member4@example.com',
        type: MemberType.CREATOR,
        nickname: 'CreatorTwo',
      },
      nickname: 'CreatorTwo',
    },
    {
      id: 'r5',
      member: {
        id: '5',
        phone: '555-555-5555',
        email: 'member5@example.com',
        type: MemberType.EDITOR,
        nickname: 'EditorTwo',
      },
      nickname: 'EditorTwo',
    },
  ];

  constructor(
    private translate: TranslateService,
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
    // this.listMember();
    // this.listAllMembers();
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
      // this.loaderService.show();
      // this.service.save(this.member).subscribe(
      //   (res) => {
      //     this.ngOnInit();
      //     this.member = new MemberRequest();
      //     this.loaderService.hide();
      //     this.notificationService.showSuccess(
      //       'Membro adicionado com sucesso!'
      //     );
      //   },
      //   (error) => {
      //     this.loaderService.hide();
      //     this.notificationService.showError(
      //       'Membro não cadastrado por favor tente novamente.'
      //     );
      //   }
      // );
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
