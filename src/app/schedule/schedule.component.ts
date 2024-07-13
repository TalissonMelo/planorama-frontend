import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { LoaderService } from '../components/loader/loader.service';
import { ModalComponent } from '../components/modal/modal.component';
import { SessionService } from '../components/modal/service/session.service';
import { LegendResponse } from '../legend/domain/legend_response';
import { LegendService } from '../legend/service/legend.service';
import { UseSession } from '../util/useSession';
import { ScheduleResponse } from './schedule-name/domain/schedule_response';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class ScheduleComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  events: any[] = [];
  public start!: number;
  public finish!: number;
  public useSession: UseSession;
  public schedule!: ScheduleResponse;
  public legends: LegendResponse[] = [];

  refresh: Subject<void> = new Subject<void>();
  activeDayIsOpen: boolean = true;

  constructor(
    private sessionService: SessionService,
    private legendService: LegendService,
    private loaderService: LoaderService,
    public dialog: MatDialog
  ) {
    this.useSession = new UseSession();
    this.schedule = this.useSession.getScheduleId();
  }
  ngOnInit(): void {
    this.schedule = this.useSession.getScheduleId();
    const date: Date = new Date();
    this.listSessions(date.getMonth() + 1, date.getFullYear());
    this.start = this.useSession.toNumber(this.schedule.startTime);
    this.finish = this.useSession.toNumberAddHour(this.schedule.endTime);
    this.listLegends();
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

  openModal(day: { date: Date }) {
    this.useSession.setDate(day);
    this.useSession.setScheduleId(this.schedule);
    this.dialog.open(ModalComponent);
  }
}
