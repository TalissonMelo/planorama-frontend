import { Injectable } from '@angular/core';
import { UserLogin } from '../components/login/user/model/user_login';

@Injectable()
export class UseSession {
  setUser(user: UserLogin): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): UserLogin {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : '';
  }

  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  getToken(): string {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : '';
  }
}
