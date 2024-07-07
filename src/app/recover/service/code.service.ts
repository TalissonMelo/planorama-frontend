import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CodeRequest } from '../domain/code_request';
import { CodeResponse } from '../domain/code_response';
@Injectable({
  providedIn: 'root',
})
export class CodeService {
  constructor(private http: HttpClient) {}

  sendCode(code: CodeRequest): Observable<CodeResponse> {
    return this.http.post<CodeResponse>(
      `${environment.uri}/v1/users/passwords/codes`,
      code
    );
  }
}
