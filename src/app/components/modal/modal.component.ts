import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import { LegendResponse } from 'src/app/legend/domain/legend_response';
import { LegendService } from 'src/app/legend/service/legend.service';
import { LoaderService } from '../loader/loader.service';
import { SessionRequest } from './domain/session_request';
import { SessionService } from './service/session.service';
import { ScheduleResponse } from 'src/app/schedule/schedule-name/domain/schedule_response';
import { UseSession } from 'src/app/util/useSession';
import { NotificationService } from '../notification/notification.service';
import { SessionResponse } from './domain/session_response';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public sessionRequest: SessionRequest;
  public useSession: UseSession;
  public legends: LegendResponse[] = [];
  public events: SessionResponse[] = [];
  public selectedDays: any[] = [];

  public date: Date;
  public schedule: ScheduleResponse;

  public daysOfWeeks = [
    { label: 'Segunda-feira', value: 'MONDAY' },
    { label: 'Terça-feira', value: 'TUESDAY' },
    { label: 'Quarta-feira', value: 'WEDNESDAY' },
    { label: 'Quinta-feira', value: 'THURSDAY' },
    { label: 'Sexta-feira', value: 'FRIDAY' },
    { label: 'Sábado', value: 'SATURDAY' },
    { label: 'Domingo', value: 'SUNDAY' },
  ];

  constructor(
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private sessionService: SessionService,
    private legendService: LegendService,
    private loaderService: LoaderService
  ) {
    this.sessionRequest = new SessionRequest();
    this.useSession = new UseSession();
    this.date = this.useSession.getDate().date;
    this.schedule = this.useSession.getScheduleId();
  }

  ngOnInit(): void {
    this.listLegends();
    this.listSessions();
  }

  listSessions(): void {
    this.loaderService.show();
    this.sessionService.listSessions(this.schedule.id, this.date).subscribe(
      (res) => {
        this.events = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  listLegends(): void {
    this.loaderService.show();
    this.legendService.getLegends().subscribe(
      (res) => {
        this.legends = res;
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  close() {
    this.dialogRef.close();
  }

  addEvent(): void {
    this.sessionRequest.daysOfWeeks = this.selectedDays;
    this.sessionRequest.scheduleId = this.schedule.id;
    if (this.isValidSession()) {
      this.loaderService.show();
      this.sessionService.save(this.sessionRequest).subscribe(
        (res) => {
          this.loaderService.hide();
          this.ngOnInit();
          this.notificationService.showSuccess(
            'Agendamento cadastrada com sucesso!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Agendamento inválido por favor tente novamente.'
          );
        }
      );
    }
  }

  isValidSession(): boolean {
    return true;
  }

  deleted(eventToDelete: SessionResponse) {
    this.loaderService.show();
    this.sessionService.delete(eventToDelete.id).subscribe(
      (res) => {
        const index = this.events.indexOf(eventToDelete);
        this.events.splice(index, 1);
        this.loaderService.hide();
        this.notificationService.showSuccess(
          'Agendamento deletada com sucesso!'
        );
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Agendamento não deletada por favor tente novamente.'
        );
      }
    );
  }

  onDayChange(event: any) {
    const dayValue = event.target.value;
    if (event.target.checked) {
      this.selectedDays.push(dayValue);
    } else {
      this.selectedDays = this.selectedDays.filter((day) => day !== dayValue);
    }
  }
}
