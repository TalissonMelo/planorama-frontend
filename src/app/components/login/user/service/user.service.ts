import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';
import { UserLogin } from '../model/user_login';
import { UserToken } from '../model/user_token';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  logar(login: Login): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      `${environment.uri}/login`,
      new Login(login.email, btoa(login.password))
    );
  }

  usuarioAltenticado(): boolean {
    let token = this.useSession.getToken();
    if (token) {
      return true;
    }
    return false;
  }

  setToken(token: string): Observable<void> {
    const userToken: UserToken = new UserToken(token);
    return this.http.put<void>(`${environment.uri}/v1/users/token`, userToken);
  }
}
