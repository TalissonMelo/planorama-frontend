import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UseSession } from 'src/app/util/useSession';
import { Login } from '../model/login';
import { Observable } from 'rxjs';
import { UserLogin } from '../model/user_login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public idUser!: number;
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
