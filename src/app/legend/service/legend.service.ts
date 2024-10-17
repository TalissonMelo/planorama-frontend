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
    const userId: string = this.useSession.getUser().id;
    return this.http.post<LegendResponse>(
      `${environment.url}/captions/users/${userId}`,
      legend
    );
  }

  delete(legendId: string): Observable<any> {
    return this.http.delete<any>(`${environment.url}/captions/${legendId}`);
  }

  legends(): Observable<LegendResponse[]> {
    const userId: string = this.useSession.getUser().id;
    return this.http.get<LegendResponse[]>(
      `${environment.url}/captions/users/${userId}`
    );
  }
}
