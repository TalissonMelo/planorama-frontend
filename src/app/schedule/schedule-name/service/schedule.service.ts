import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { ScheduleRequest } from '../domain/schedule_request';
import { ScheduleResponse } from '../domain/schedule_response';
import { Home } from 'src/app/components/home/domain/home';
import { HomeFreeTimes } from 'src/app/components/home/domain/home_free_times';
import { UserPermissions } from '../domain/user_permissions';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  save(schedule: ScheduleRequest): Observable<ScheduleResponse> {
    return this.http.post<ScheduleResponse>(
      `${environment.uri}/v1/schedule`,
      schedule
    );
  }

  delete(scheduleId: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.uri}/v1/schedule/${scheduleId}`
    );
  }

  update(
    scheduleId: string,
    schedule: ScheduleRequest
  ): Observable<ScheduleResponse> {
    return this.http.put<ScheduleResponse>(
      `${environment.uri}/v1/schedule/${scheduleId}`,
      schedule
    );
  }

  list(): Observable<any> {
    return this.http.get<any[]>(`${environment.url}/v1/schedule`);
  }

  listed(date: string): Observable<Home[]> {
    let params = new HttpParams().set('date', date);
    return this.http.get<Home[]>(`${environment.uri}/v1/schedules`, { params });
  }

  listedFree(
    date: string,
    selectedDuration: number
  ): Observable<HomeFreeTimes[]> {
    let params = new HttpParams()
      .set('date', date)
      .set('minutes', selectedDuration);
    return this.http.get<HomeFreeTimes[]>(
      `${environment.uri}/v1/schedules/free-times`,
      {
        params,
      }
    );
  }

  permissions(): Observable<UserPermissions> {
    return this.http.get<UserPermissions>(
      `${environment.uri}/v1/users/profiles`
    );
  }
}
