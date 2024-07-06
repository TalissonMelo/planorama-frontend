import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PhoneNumber } from '../domain/phone_number';
import { RecoverEmail } from '../domain/recover_email';
@Injectable({
  providedIn: 'root',
})
export class RecoverService {
  constructor(private http: HttpClient) {}

  sendCode(email: RecoverEmail): Observable<PhoneNumber> {
    return this.http.put<PhoneNumber>(
      `${environment.uri}/v1/users/passwords`,
      email
    );
  }
}
