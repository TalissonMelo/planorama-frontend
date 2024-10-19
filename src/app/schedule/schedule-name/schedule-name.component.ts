import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NotificationService } from 'src/app/components/notification/notification.service';
import { UseSession } from 'src/app/util/useSession';
import label from 'src/assets/i18n/label';
import { ScheduleRequest } from './domain/schedule_request';
import { ScheduleResponse } from './domain/schedule_response';
import { UserPermissions } from './domain/user_permissions';
import { ScheduleService } from './service/schedule.service';

@Component({
  selector: 'app-schedule-name',
  templateUrl: './schedule-name.component.html',
})
export class ScheduleNameComponent implements OnInit {
  public userPermissions: UserPermissions = new UserPermissions();
  public schedules: ScheduleResponse[] = [];
  public editSchedule: string = '';
  public schedule: ScheduleRequest;
  public useSession: UseSession;
  public userId: string;
  public label = label;

  constructor(
    private router: Router,
    private service: ScheduleService,
    private translate: TranslateModule,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.useSession = new UseSession();
    this.schedule = new ScheduleRequest();
    this.userId = this.useSession.getUser().id;
  }

  ngOnInit(): void {
    // this.listPermissions();
    this.listSchedules();
  }

  listPermissions(): void {
    this.service.permissions().subscribe((res) => {
      this.userPermissions = new UserPermissions();
      this.userPermissions.id = res.id;
      this.userPermissions.profiles = res.profiles || [];
    });
  }

  listSchedules(): void {
    this.loaderService.show();
    this.service.list().subscribe((res) => {
      this.schedules = res;
      this.loaderService.hide();
    });
  }

  save(): void {
    this.service.save(this.schedule).subscribe(
      (res) => {
        this.schedule = new ScheduleRequest();
        this.schedules.unshift(res);
        this.loaderService.hide();
        this.notificationService.showSuccess(
          'Schedule registered successfully!'
        );
      },
      (error) => {
        this.loaderService.hide();
        this.notificationService.showError(
          'Invalid calendar entry please try again.'
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
    this.notificationService.showError('Invalid calendar please try again.');
    return false;
  }

  listSessionsByScheduleId(schedule: ScheduleResponse) {
    this.useSession.setScheduleId(schedule);
    this.router.navigate(['session']);
  }

  edit(scheduleId: string) {
    this.editSchedule = scheduleId;
  }

  deleted(schedule: ScheduleResponse) {
    if (confirm('Do you want to delete the calendar: ' + schedule.name)) {
      this.loaderService.show();
      this.service.delete(schedule.id).subscribe(
        (res) => {
          const index = this.schedules.indexOf(schedule);
          this.schedules.splice(index, 1);
          this.loaderService.hide();
          this.notificationService.showSuccess(
            'Schedule deleted successfully!'
          );
        },
        (error) => {
          this.loaderService.hide();
          this.notificationService.showError(
            'Schedule not deleted please try again.'
          );
        }
      );
    }
  }

  listMembersByScheduleId(schedule: ScheduleResponse) {
    this.useSession.setScheduleId(schedule);
    this.router.navigate(['/members']);
  }

  update(schedule: ScheduleResponse) {
    this.loaderService.show();
    this.editSchedule = '';
    let scheduleUpdate: ScheduleRequest = this.createSchedule(schedule);
    this.service.update(schedule.id, scheduleUpdate).subscribe(
      (res) => {
        this.loaderService.hide();
        this.notificationService.showSuccess('Schedule updated successfully!');
      },
      (error) => {
        console.log(error);
        this.loaderService.hide();
        this.notificationService.showError(
          'Schedule not updated please try again.'
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
