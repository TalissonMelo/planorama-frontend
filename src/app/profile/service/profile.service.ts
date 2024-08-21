import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChangePasswordRequest } from '../model/change_password_request';
import { UseSession } from 'src/app/util/useSession';
import { UserUpdateRequest } from '../model/user_update_request';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  changePassword(changePassword: ChangePasswordRequest): Observable<void> {
    const changePasswordRequest: ChangePasswordRequest =
      new ChangePasswordRequest(
        btoa(changePassword.oldPassword),
        btoa(changePassword.newPassword)
      );
    return this.http.put<void>(
      `${environment.uri}/v1/users/${this.useSession.getUser().id}/passwords`,
      changePasswordRequest
    );
  }

  userUpdate(user: UserUpdateRequest): Observable<void> {
    return this.http.put<void>(
      `${environment.uri}/v1/users/${this.useSession.getUser().id}`,
      user
    );
  }
}
