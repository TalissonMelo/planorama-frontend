import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../domain/message';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  save(sessionId: string, message: Message): Observable<Message> {
    return this.http.post<Message>(
      `${environment.uri}/v1/sessions/${sessionId}/chat`,
      message
    );
  }
}
