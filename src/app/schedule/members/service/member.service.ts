import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { MemberResponse } from '../domain/member_response';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  list(scheduleId: string): Observable<MemberResponse[]> {
    return this.http.get<MemberResponse[]>(
      `${environment.uri}/v1/schedule/${scheduleId}/members`
    );
  }
}
