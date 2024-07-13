import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';
import { UserLogin } from '../model/user_login';

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
}
