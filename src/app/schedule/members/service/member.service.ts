import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { MemberRequest } from '../domain/member_request';
import { MemberResponse } from '../domain/member_response';
import { MemberSchedule } from '../domain/member_schedule';

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

  save(member: MemberRequest): Observable<MemberResponse> {
    return this.http.post<MemberResponse>(
      `${environment.uri}/v1/members`,
      member
    );
  }

  listMember(scheduleId: string): Observable<MemberSchedule> {
    const memberId: string = this.useSession.getUser().id;
    return this.http.get<MemberSchedule>(
      `${environment.uri}/v1/schedule/${scheduleId}/members/${memberId}`
    );
  }

  delete(memberId: string): Observable<any> {
    return this.http.delete<any>(`${environment.uri}/v1/members/${memberId}`);
  }
}
