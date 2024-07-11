import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { SessionRequest } from '../domain/session_request';
import { format } from 'date-fns';
import { SessionResponse } from '../domain/session_response';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  save(session: SessionRequest): Observable<void> {
    return this.http.post<void>(`${environment.uri}/v1/sessions`, session);
  }

  listSessions(scheduleId: string, date: Date): Observable<SessionResponse[]> {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const params = new HttpParams().set('date', formattedDate);
    return this.http.get<SessionResponse[]>(
      `${environment.uri}/v1/schedule/${scheduleId}/session`,
      { params }
    );
  }

  delete(sessionId: string): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/v1/sessions/${sessionId}`);
  }
}
