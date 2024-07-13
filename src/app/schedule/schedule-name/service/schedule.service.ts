import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { ScheduleRequest } from '../domain/schedule_request';
import { ScheduleResponse } from '../domain/schedule_response';
import { Home } from 'src/app/components/home/domain/home';

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

  list(): Observable<ScheduleResponse[]> {
    return this.http.get<ScheduleResponse[]>(`${environment.uri}/v1/schedule`);
  }

  listed(): Observable<Home[]> {
    return this.http.get<Home[]>(`${environment.uri}/v1/schedules`);
  }
}
