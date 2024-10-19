import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UseSession } from 'src/app/util/useSession';
import { environment } from 'src/environments/environment';
import { Settings } from '../model/settings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  public useSession: UseSession;

  constructor(private http: HttpClient) {
    this.useSession = new UseSession();
  }

  list(): Observable<Settings> {
    const userId: string = this.useSession.getUser().id;
    return this.http.get<Settings>(
      `${environment.url}/settings/users/${userId}`
    );
  }

  save(settings: Settings): Observable<Settings> {
    const userId: string = this.useSession.getUser().id;
    return this.http.post<Settings>(
      `${environment.url}/settings/users/${userId}`,
      settings
    );
  }
}
