import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../domain/change_password';
@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  changePassword(change: ChangePassword): Observable<void> {
    const password: ChangePassword = new ChangePassword(
      change.code,
      change.email,
      btoa(change.newPassword)
    );
    return this.http.put<void>(
      `${environment.uri}/v1/users/passwords/codes`,
      password
    );
  }
}
