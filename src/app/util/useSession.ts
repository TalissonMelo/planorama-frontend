import { Injectable } from '@angular/core';
import { UserLogin } from '../components/login/user/model/user_login';
import { CodeResponse } from '../recover/domain/code_response';
import { ScheduleResponse } from '../schedule/schedule-name/domain/schedule_response';
import { SessionResponse } from '../components/modal/domain/session_response';
import { Settings } from '../configure/model/settings';

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

  setSettings(settings: Settings): void {
    localStorage.setItem('settings', JSON.stringify(settings));
  }

  getSettings(): Settings {
    const settings = localStorage.getItem('settings');
    return settings ? JSON.parse(settings) : '';
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

  setScheduleId(schedule: ScheduleResponse): void {
    localStorage.setItem('schedule', JSON.stringify(schedule));
  }

  getScheduleId(): ScheduleResponse {
    const schedule = localStorage.getItem('schedule');
    return schedule ? JSON.parse(schedule) : '';
  }

  setDate(date: { date: Date }): void {
    localStorage.setItem('date', JSON.stringify(date));
  }

  getDate(): { date: Date } {
    const date = localStorage.getItem('date');
    return date ? JSON.parse(date) : '';
  }

  toNumber(timeString: string): number {
    const parts: string[] = timeString.split(':');
    const firstPart: number = parseInt(parts[0], 10);
    return firstPart;
  }

  toNumberAddHour(timeString: string): number {
    const parts: string[] = timeString.split(':');
    const firstPart: number = parseInt(parts[0], 10);
    return firstPart + 1;
  }

  setSession(session: SessionResponse): void {
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSession(): SessionResponse | any {
    const session = localStorage.getItem('session');
    if (session) {
      localStorage.removeItem('session');
      return JSON.parse(session);
    }
    return null;
  }
}
