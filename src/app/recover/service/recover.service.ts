import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Email } from '../domain/email';
import { RecoverEmail } from '../domain/recover_email';
@Injectable({
  providedIn: 'root',
})
export class RecoverService {
  constructor(private http: HttpClient) {}

  sendCode(email: RecoverEmail): Observable<Email> {
    return this.http.put<Email>(`${environment.uri}/v1/users/passwords`, email);
  }
}
