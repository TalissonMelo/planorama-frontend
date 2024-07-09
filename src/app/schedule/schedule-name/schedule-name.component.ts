import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduleResponse } from './domain/schedule_response';
import { ScheduleService } from './service/schedule.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { ScheduleRequest } from './domain/schedule_request';
import { UseSession } from 'src/app/util/useSession';

@Component({
  selector: 'app-schedule-name',
  templateUrl: './schedule-name.component.html',
  styleUrls: ['./schedule-name.component.css'],
})
export class ScheduleNameComponent implements OnInit {
  public schedules: ScheduleResponse[] = [];
  public editSchedule: string = '';
  public schedule: ScheduleRequest;
  public useSession: UseSession;
  public userId: string;

  constructor(
    private router: Router,
    private service: ScheduleService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.useSession = new UseSession();
    this.schedule = new ScheduleRequest();
    this.userId = this.useSession.getUser().id;
  }

  ngOnInit(): void {
    this.loaderService.show();
    this.service.list().subscribe(
      (res) => {
        this.schedules = res;
        this.loaderService.hide();
      },
      (error) => {
        this.loaderService.hide();
      }
    );
  }

  save(): void {
    this.service.save(this.schedule).subscribe(
      (res) => {
        this.schedule = new ScheduleRequest();
        this.schedules.unshift(res);
        this.loaderService.hide();
        this.notificationService.showSuccess('Agenda registrada com sucesso!');
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Registro de agenda inválido por favor tente novamente.'
        );
      }
    );
  }

  isValidSchedule(): boolean {
    if (
      this.schedule.name != null &&
      this.schedule.startTime != null &&
      this.schedule.endTime != null &&
      this.schedule.startTime < this.schedule.endTime
    ) {
      return true;
    }
    this.notificationService.showError(
      'Agenda inválido por favor tente novamente.'
    );
    return false;
  }

  listSessionsByScheduleId(schedule: ScheduleResponse) {
    this.router.navigate(['session']);
  }

  edit(scheduleId: string) {
    this.editSchedule = scheduleId;
  }

  deleted(schedule: ScheduleResponse) {
    this.loaderService.show();
    this.service.delete(schedule.id).subscribe(
      (res) => {
        const index = this.schedules.indexOf(schedule);
        this.schedules.splice(index, 1);
        this.loaderService.hide();
        this.notificationService.showSuccess('Agenda deletada com sucesso!');
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Agenda não deletada por favor tente novamente.'
        );
      }
    );
  }

  listMembersByScheduleId(schedule: ScheduleResponse) {
    this.useSession.setScheduleId(schedule);
    this.router.navigate(['/members']);
  }

  update(schedule: ScheduleResponse) {
    this.editSchedule = '';
    let scheduleUpdate: ScheduleRequest = this.createSchedule(schedule);
    this.service.update(schedule.id, scheduleUpdate).subscribe(
      (res) => {
        this.loaderService.hide();
        this.notificationService.showSuccess('Agenda atualizada com sucesso!');
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Agenda não atualizada por favor tente novamente.'
        );
      }
    );
  }

  createSchedule(schedule: ScheduleResponse): ScheduleRequest {
    let scheduleUpdate: ScheduleRequest = new ScheduleRequest();
    scheduleUpdate.name = schedule.name;
    scheduleUpdate.startTime = schedule.startTime;
    scheduleUpdate.endTime = schedule.endTime;
    return scheduleUpdate;
  }
}
