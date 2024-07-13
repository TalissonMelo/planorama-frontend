import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LegendResponse } from 'src/app/legend/domain/legend_response';
import { LegendService } from 'src/app/legend/service/legend.service';
import { MemberSchedule } from 'src/app/schedule/members/domain/member_schedule';
import { MemberService } from 'src/app/schedule/members/service/member.service';
import { ScheduleResponse } from 'src/app/schedule/schedule-name/domain/schedule_response';
import { UseSession } from 'src/app/util/useSession';
import { LoaderService } from '../loader/loader.service';
import { NotificationService } from '../notification/notification.service';
import { SessionRequest } from './domain/session_request';
import { SessionResponse } from './domain/session_response';
import { SessionService } from './service/session.service';
import { SessionUpdate } from './domain/session_update';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  public date: Date;
  public sessionIdEdit: string = '';
  public legends: LegendResponse[] = [];
  public events: SessionResponse[] = [];
  public sessionRequest: SessionRequest;
  public memberSchedule!: MemberSchedule;
  public schedule: ScheduleResponse;
  public selectedDays: any[] = [];
  public useSession: UseSession;

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
    private loaderService: LoaderService,
    private dialogRef: MatDialogRef<ModalComponent>,
    private memberService: MemberService,
    private legendService: LegendService,
    private sessionService: SessionService
  ) {
    this.sessionRequest = new SessionRequest();
    this.useSession = new UseSession();
    this.date = this.useSession.getDate().date;
    this.schedule = this.useSession.getScheduleId();
  }

  ngOnInit(): void {
    this.listMember();
    this.listLegends();
    this.listSessions();
  }

  listMember(): void {
    this.loaderService.show();
    this.memberService.listMember(this.schedule.id).subscribe((res) => {
      this.memberSchedule = res;
      this.loaderService.hide();
    });
  }

  listSessions(): void {
    this.loaderService.show();
    this.sessionService
      .listSessions(this.schedule.id, this.date)
      .subscribe((res) => {
        this.events = res;
        this.loaderService.hide();
      });
  }

  listLegends(): void {
    this.legendService.getLegends().subscribe((res) => {
      this.legends = res;
    });
  }

  close() {
    this.dialogRef.close();
    this.ngOnInit();
  }

  addEvent(): void {
    this.sessionRequest.daysOfWeeks = this.selectedDays;
    this.sessionRequest.scheduleId = this.schedule.id;
    if (this.isValidSession()) {
      this.loaderService.show();
      this.sessionService.save(this.sessionRequest).subscribe(
        (res) => {
          this.loaderService.hide();
          this.sessionRequest = new SessionRequest();
          this.notificationService.showSuccess(
            'Agendamento cadastrada com sucesso!'
          );
          this.ngOnInit();
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
    if (this.sessionRequest.endTime <= this.sessionRequest.startTime) {
      this.notificationService.showError(
        'A data de finalização deve ser maior que a data de início.'
      );
      return false;
    }

    // const msInDay = 24 * 60 * 60 * 1000;
    // const dateDifference =
    //   (this.sessionRequest.endTime.getTime() -
    //     this.sessionRequest.startTime.getTime()) /
    //   msInDay;
    // if (dateDifference > 2 && this.daysOfWeeks.length === 0) {
    //   this.notificationService.showError(
    //     'Preencha os dias da semana para intervalos de datas maiores que 2 dias.'
    //   );
    //   return false;
    // }

    if (!this.sessionRequest.title) {
      this.notificationService.showError('O título não pode ser nulo.');
      return false;
    }

    if (!this.sessionRequest.legendId) {
      this.notificationService.showError('A legenda não pode ser nula.');
      return false;
    }

    return true;
  }

  deleted(eventToDelete: SessionResponse) {
    if (confirm('Deseja deletar o agendamento: ' + eventToDelete.title)) {
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
  }

  onDayChange(event: any) {
    const dayValue = event.target.value;
    if (event.target.checked) {
      this.selectedDays.push(dayValue);
    } else {
      this.selectedDays = this.selectedDays.filter((day) => day !== dayValue);
    }
  }

  edit(session: SessionResponse): void {
    this.sessionIdEdit = this.sessionIdEdit == '' ? session.id : '';
  }

  editDescription(event: any) {
    this.loaderService.show();
    let uploadSession: SessionUpdate = new SessionUpdate();
    uploadSession.description = event.description;
    this.sessionService.edit(event.id, uploadSession).subscribe(
      (res) => {
        this.sessionIdEdit = '';
        this.loaderService.hide();
        this.notificationService.showSuccess(
          'Agendamento atualizado com sucesso!'
        );
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Agendamento não atualizado por favor tente novamente.'
        );
      }
    );
  }
}
