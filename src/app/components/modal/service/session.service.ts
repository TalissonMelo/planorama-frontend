import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { map, Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { SessionRequest } from '../domain/session_request';
import { SessionResponse } from '../domain/session_response';
import { SessionUpdate } from '../domain/session_update';

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

  sessions(
    scheduleId: string,
    month: number,
    year: number
  ): Observable<SessionResponse[]> {
    const params = new HttpParams().set('year', year).set('month', month);
    return this.http
      .get<SessionResponse[]>(
        `${environment.uri}/v1/schedule/${scheduleId}/sessions`,
        { params }
      )
      .pipe(
        map((sessions) =>
          sessions.map((session) => ({
            ...session,
            start: new Date(session.start),
            end: new Date(session.end),
          }))
        )
      );
  }

  delete(sessionId: string): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/v1/sessions/${sessionId}`);
  }

  edit(sessionId: string, session: SessionUpdate): Observable<void> {
    return this.http.put<void>(
      `${environment.uri}/v1/sessions/${sessionId}`,
      session
    );
  }
}
