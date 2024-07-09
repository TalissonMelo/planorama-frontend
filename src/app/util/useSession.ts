import { Injectable } from '@angular/core';
import { UserLogin } from '../components/login/user/model/user_login';
import { CodeResponse } from '../recover/domain/code_response';

@Injectable()
export class UseSession {
  clear(): void {
    localStorage.clear();
  }

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

  setData(data: any): void {
    localStorage.setItem('data', JSON.stringify(data));
  }

  getData(): any | null {
    const data = localStorage.getItem('data');
    if (data) {
      localStorage.removeItem('data');
      return JSON.parse(data);
    }
    return null;
  }

  setCode(codeResponse: CodeResponse): void {
    localStorage.setItem('codeResponse', JSON.stringify(codeResponse));
  }

  getCode(): any | null {
    const codeResponse = localStorage.getItem('codeResponse');
    if (codeResponse) {
      localStorage.removeItem('codeResponse');
      return JSON.parse(codeResponse);
    }
    return null;
  }

  setScheduleId(scheduleId: string): void {
    localStorage.setItem('scheduleId', JSON.stringify(scheduleId));
  }

  getScheduleId(): string {
    const scheduleId = localStorage.getItem('scheduleId');
    return scheduleId ? JSON.parse(scheduleId) : '';
  }
}
