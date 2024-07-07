import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UseSession } from 'src/app/util/useSession';
import { LegendRequest } from '../domain/legend_request';
import { LegendResponse } from '../domain/legend_response';

@Injectable({
  providedIn: 'root',
})
export class LegendService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  save(legend: LegendRequest): Observable<LegendResponse> {
    return this.http.post<LegendResponse>(
      `${environment.uri}/v1/legends`,
      legend
    );
  }

  delete(legendId: string): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/v1/legends/${legendId}`);
  }

  update(legendId: string, legend: LegendRequest): Observable<LegendResponse> {
    return this.http.put<LegendResponse>(
      `${environment.uri}/v1/legends/${legendId}`,
      legend
    );
  }

  getLegends(): Observable<LegendResponse[]> {
    const userId: string = this.useSession.getUser().id;
    return this.http.get<LegendResponse[]>(
      `${environment.uri}/v1/user/${userId}/legend`
    );
  }

  legendBySchedule(scheduleId: string): Observable<LegendResponse[]> {
    return this.http.get<LegendResponse[]>(
      `${environment.uri}/v1/schedule/${scheduleId}/legend`
    );
  }
}
