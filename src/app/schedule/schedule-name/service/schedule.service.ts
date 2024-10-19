import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  list(): Observable<any> {
    const headers = new HttpHeaders({
      timezone: this.useSession.getSettings().timeZone,
    });

    const userId: string = this.useSession.getUser().id;
    return this.http.get<any[]>(
      `${environment.url}/schedules/users/${userId}`,
      { headers }
    );
  }

  delete(scheduleId: string): Observable<any> {
    return this.http.delete<any>(`${environment.url}/schedules/${scheduleId}`);
  }

  save(schedule: ScheduleRequest): Observable<ScheduleResponse> {
    const headers = new HttpHeaders({
      timezone: this.useSession.getSettings().timeZone,
    });
    const userId: string = this.useSession.getUser().id;
    return this.http.post<ScheduleResponse>(
      `${environment.url}/schedules/users/${userId}`,
      schedule,
      { headers }
    );
  }

  update(
    scheduleId: string,
    schedule: ScheduleRequest
  ): Observable<ScheduleResponse> {
    const headers = new HttpHeaders({
      timezone: this.useSession.getSettings().timeZone,
    });
    return this.http.put<ScheduleResponse>(
      `${environment.url}/schedules/${scheduleId}`,
      schedule,
      { headers }
    );
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
