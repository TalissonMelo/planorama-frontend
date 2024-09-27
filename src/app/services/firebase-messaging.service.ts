import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { UserService } from '../components/login/user/service/user.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseMessagingService {
  constructor(private http: HttpClient, private service: UserService) {}

  private firebaseConfig = {
    apiKey: 'AIzaSyDh2q-EDmVTvKNsiAcIkx4hdrgUFb56ctQ',
    authDomain: 'planorama-firebase.firebaseapp.com',
    projectId: 'planorama-firebase',
    storageBucket: 'planorama-firebase.appspot.com',
    messagingSenderId: '886060142636',
    appId: '1:886060142636:web:2e26b9f3ed032b885a0189',
  };

  private vapidKey =
    'BPxWM83p8poGjan_GT0oUVcvxRXF82_yD7SotTfmZfJcYWMqzld1Z-AM81wsLC_zNXRHFLYVL8yV586ReWLPc8M';

  public initFirebase() {
    const app = initializeApp(this.firebaseConfig);
    this.requestPermission(app);
  }

  public requestPermission(app: any) {
    const messaging = getMessaging(app);

    Notification.requestPermission()
      .then((permission) => {
        if (permission === 'granted') {
          console.log('Permissão concedida para notificações.');

          getToken(messaging, { vapidKey: this.vapidKey })
            .then((currentToken) => {
              if (currentToken) {
                this.sendTokenToServer(currentToken);
              } else {
                console.log(
                  'Nenhum token disponível. Solicite permissão para gerar um token.'
                );
              }
            })
            .catch((err) => {
              console.log('Erro ao obter o token.', err);
            });
        } else {
          console.log('Permissão negada ou bloqueada para notificações.');
        }
      })
      .catch((err) => {
        console.log('Erro ao solicitar permissão para notificações.', err);
      });
  }

  private sendTokenToServer(token: string) {
    this.service.setToken(token).subscribe(
      () => {
        console.log('ok');
      },
      (error) => {
        console.error('Erro ao enviar o token:', error);
      }
    );
  }
}
