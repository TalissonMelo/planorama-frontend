import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { UserToken } from '../model/user_token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  setToken(token: string): Observable<void> {
    const userToken: UserToken = new UserToken(token);
    return this.http.put<void>(`${environment.uri}/v1/users/token`, userToken);
  }
}
