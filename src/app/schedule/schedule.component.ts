import { Component, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CalendarView } from 'angular-calendar';
import { Subject, Subscription } from 'rxjs';
import { LoaderService } from '../components/loader/loader.service';
import { ModalComponent } from '../components/modal/modal.component';
import { SessionService } from '../components/modal/service/session.service';
import { LegendResponse } from '../legend/domain/legend_response';
import { LegendService } from '../legend/service/legend.service';
import { UseSession } from '../util/useSession';
import { MemberSchedule } from './members/domain/member_schedule';
import { MemberService } from './members/service/member.service';
import { ScheduleResponse } from './schedule-name/domain/schedule_response';
import { NotificationEmitter } from '../components/notification/notification_emitter';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  notificationSubscription!: Subscription;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  // events: any[] = [];

  events: any[] = [
    {
      id: 'session1',
      scheduleId: '1a2b3c',
      color: { primary: '#FF5733', secondary: '#FFC300' },
      title: 'Kick-off Meeting',
      start: new Date('2024-10-05T09:00:00Z'),
      end: new Date('2024-10-05T10:00:00Z'),
      description: 'Initial meeting to discuss project goals.',
    },
    {
      id: 'session2',
      scheduleId: '4d5e6f',
      color: { primary: '#33FF57', secondary: '#A1FFCE' },
      title: 'Planning Session',
      start: new Date('2024-10-05T11:00:00Z'),
      end: new Date('2024-10-05T12:30:00Z'),
      description: 'Detailed planning for the upcoming sprint.',
    },
    {
      id: 'session3',
      scheduleId: '7g8h9i',
      color: { primary: '#FFD700', secondary: '#FFEF96' },
      title: 'Lunch Break',
      start: new Date('2024-10-05T13:00:00Z'),
      end: new Date('2024-10-05T14:00:00Z'),
      description: 'Time to relax and recharge.',
    },
    {
      id: 'session4',
      scheduleId: '10j11k',
      color: { primary: '#3357FF', secondary: '#A0C4FF' },
      title: 'Team Sync-up',
      start: new Date('2024-10-05T15:00:00Z'),
      end: new Date('2024-10-05T16:00:00Z'),
      description: 'Daily sync-up to discuss team progress.',
    },
  ];

  public start!: number;
  public finish!: number;
  public useSession: UseSession;
  public schedule!: ScheduleResponse;
  public memberSchedule!: MemberSchedule;
  // public legends: LegendResponse[] = [];

  legends: LegendResponse[] = [
    {
      id: 'legend1',
      color: '#FF5733',
      ownerId: 'owner123',
      description: 'Important meetings',
    },
    {
      id: 'legend2',
      color: '#33FF57',
      ownerId: 'owner456',
      description: 'Team sync-ups',
    },
    {
      id: 'legend3',
      color: '#3357FF',
      ownerId: 'owner789',
      description: 'Project deadlines',
    },
    {
      id: 'legend4',
      color: '#FFD700',
      ownerId: 'owner1011',
      description: 'Personal time',
    },
  ];

  refresh: Subject<void> = new Subject<void>();
  activeDayIsOpen: boolean = true;

  constructor(
    private router: Router,
    private notificationService: NotificationEmitter,
    private sessionService: SessionService,
    private legendService: LegendService,
    private loaderService: LoaderService,
    private memberService: MemberService,
    public dialog: MatDialog
  ) {
    this.useSession = new UseSession();
    this.schedule = this.useSession.getScheduleId();
  }
  ngOnInit(): void {
    // this.listInit();
    // this.notificationSubscription =
    //   this.notificationService.notificationEmitter.subscribe((message) => {
    //     this.listInit();
    //   });
  }

  listInit(): void {
    this.schedule = this.useSession.getScheduleId();
    const date: Date = new Date();
    this.listSessions(date.getMonth() + 1, date.getFullYear());
    this.start = this.useSession.toNumber(this.schedule.startTime);
    this.finish = this.useSession.toNumberAddHour(this.schedule.endTime);
    this.listLegends();
    this.listMember();
  }

  listMember(): void {
    this.loaderService.show();
    this.memberService.listMember(this.schedule.id).subscribe((res) => {
      this.memberSchedule = res;
      this.loaderService.hide();
    });
  }

  listLegends(): void {
    this.loaderService.show();
    this.legendService.legendBySchedule(this.schedule.id).subscribe(
      (res) => {
        this.legends = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  listSessions(month: number, year: number): void {
    this.loaderService.show();
    this.sessionService.sessions(this.schedule.id, month, year).subscribe(
      (res) => {
        this.events = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.loaderService.show();
    this.sessionService
      .sessions(
        this.schedule.id,
        this.viewDate.getMonth() + 1,
        this.viewDate.getFullYear()
      )
      .subscribe(
        (res) => {
          this.events = res;
          this.activeDayIsOpen = false;
          this.loaderService.hide();
        },
        (error) => {
          this.loaderService.hide();
        }
      );
  }

  openModal(day: { date: Date }): void {
    this.dialog.open(ModalComponent);

    // if (this.memberSchedule.type != 'VIEWER') {
    //   this.useSession.setDate(day);
    //   this.useSession.setScheduleId(this.schedule);
    //   this.dialog.open(ModalComponent);
    // } else {
    //   this.viewDate = day.date;
    //   this.view = CalendarView.Day;
    // }
  }

  onEventClicked(event: any): void {
    if (event.event.description) {
      this.useSession.setSession(event.event);
      this.router.navigate(['chat']);
    }
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
