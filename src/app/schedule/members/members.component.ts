import { Component, OnInit } from '@angular/core';
import { UseSession } from 'src/app/util/useSession';
import { MemberService } from './service/member.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { MemberResponse } from './domain/member_response';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements OnInit {
  public useSession: UseSession;
  public members: MemberResponse[] = [];

  constructor(
    private service: MemberService,
    private loaderService: LoaderService
  ) {
    this.useSession = new UseSession();
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.service.list(this.useSession.getScheduleId()).subscribe(
      (res) => {
        this.members = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  save(): void {}

  deletarMembro(member: any): void {
    console.log(member);
  }
}
