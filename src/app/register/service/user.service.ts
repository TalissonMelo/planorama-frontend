import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { UserRequest } from '../model/user_request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  userCreate(userRequest: UserRequest): Observable<User> {
    const user = new UserRequest(
      userRequest.email,
      userRequest.nickname,
      btoa(userRequest.password)
    );
    return this.http.post<User>(`${environment.uri}/v1/users`, user);
  }
}
