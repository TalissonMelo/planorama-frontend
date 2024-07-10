import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addHours, startOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { ModalComponent } from '../components/modal/modal.component';
import { ScheduleResponse } from './schedule-name/domain/schedule_response';
import { UseSession } from '../util/useSession';

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

  public schedule!: ScheduleResponse;
  public start!: number;
  public finish!: number;
  public useSession: UseSession;

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
      meta: {
        description:
          'Discussão sobre atualizações e próximos passos do projeto.',
      },
    },
    {
      id: 2,
      start: addHours(startOfDay(new Date()), 12),
      end: addHours(startOfDay(new Date()), 13),
      title: 'Intervalo para Almoço',
      color: { primary: '#e3bc08', secondary: '#fdf1ba' },
      meta: {
        description: 'Hora do almoço.',
      },
    },
    {
      id: 3,
      start: addHours(startOfDay(new Date()), 15),
      end: addHours(startOfDay(new Date()), 16),
      title: 'Chamada com Cliente',
      color: { primary: '#ad2121', secondary: '#fae3e3' },
      meta: {
        description: 'Chamada com cliente para discutir requisitos.',
      },
    },
    {
      id: 4,
      start: addHours(startOfDay(new Date()), 18),
      end: addHours(startOfDay(new Date()), 19),
      title: 'Talisson do Dia',
      color: { primary: '#000', secondary: '#000' },
      description: 'Resumo do trabalho do dia e planejamento para amanhã.',
    },
  ];

  refresh: Subject<void> = new Subject<void>();
  activeDayIsOpen: boolean = true;

  constructor(public dialog: MatDialog) {
    this.useSession = new UseSession();
  }

  ngOnInit(): void {
    this.schedule = this.useSession.getScheduleId();
    this.start = this.useSession.toNumber(this.schedule.startTime);
    this.finish = this.useSession.toNumberAddHour(this.schedule.endTime);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleDayClick(day: { date: Date }) {
    this.viewDate = day.date;
    this.setView(CalendarView.Day);
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  openModal(day: { date: Date }) {
    console.log(day);
    this.dialog.open(ModalComponent);
  }
}
