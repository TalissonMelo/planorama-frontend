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
import { addHours, startOfDay } from 'date-fns';
import { ChatComponent } from '../chat/chat.component';
import label from 'src/assets/i18n/label';
import { TranslateService } from '@ngx-translate/core';

export function localeFactory(translate: TranslateService) {
  return translate.getDefaultLang() === 'pt'
    ? 'pt-BR'
    : translate.getDefaultLang();
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [
    { provide: LOCALE_ID, useFactory: localeFactory, deps: [TranslateService] },
  ],
})
export class ScheduleComponent implements OnInit, OnDestroy {
  label = label;
  notificationSubscription!: Subscription;
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  // events: any[] = [];

  to(date: Date, hours: number, minutes: number) {
    return new Date(
      date.getTime() + hours * 60 * 60 * 1000 + minutes * 60 * 1000
    );
  }

  events: any[] = [
    {
      id: 1,
      start: this.to(startOfDay(new Date()), 9, 30),
      end: addHours(startOfDay(new Date()), 10),
      title: 'Reunião da Manhã',
      color: { primary: '#1e90ff', secondary: '#d1e8ff' },
    },
    {
      id: 2,
      start: addHours(startOfDay(new Date()), 12),
      end: addHours(startOfDay(new Date()), 13),
      title: 'Intervalo para Almoço',
      color: { primary: '#e3bc08', secondary: '#fdf1ba' },
    },
    {
      id: 3,
      start: addHours(startOfDay(new Date()), 15),
      end: addHours(startOfDay(new Date()), 16),
      title:
        'Chamada com Cliente /n Chamada com cliente para discutir requisitos.',
      color: { primary: '#ad2121', secondary: '#fae3e3' },
    },
    {
      id: 4,
      start: addHours(startOfDay(new Date()), 18),
      end: addHours(startOfDay(new Date()), 19),
      title: 'Talisson do Dia',
      color: { primary: '#000', secondary: '#000' },
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
    private translate: TranslateService,
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

  get defaultLang() {
    return this.translate.getDefaultLang();
  }

  listInit(): void {
    this.schedule = this.useSession.getScheduleId();
    const date: Date = new Date();
    this.listSessions(date.getMonth() + 1, date.getFullYear());
    //  this.start = this.useSession.toNumber(this.schedule.startTime);
    //this.finish = this.useSession.toNumberAddHour(this.schedule.endTime);
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
    // this.legendService.legendBySchedule(this.schedule.id).subscribe(
    //   (res) => {
    //     this.legends = res;
    //     this.loaderService.hide();
    //   },
    //   (error) => {
    //     this.loaderService.hide();
    //   }
    // );
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
    this.useSession.setSession(event.event);
    this.dialog.open(ChatComponent, {
      width: '400px',
      height: '100vh',
      position: { right: '0px', top: '0px' },
      data: { event: event.event },
      panelClass: 'custom-modal-class',
    });
  }

  ngOnDestroy(): void {
    if (this.notificationSubscription) {
      this.notificationSubscription.unsubscribe();
    }
  }
}
