import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhoneNumber } from '../domain/phone_number';
import { UseSession } from 'src/app/util/useSession';

@Component({
  selector: 'app-recover-code',
  templateUrl: './recover-code.component.html',
  styleUrls: ['./recover-code.component.css'],
})
export class RecoverCodeComponent {
  public phoneNumber!: PhoneNumber;
  public useSession: UseSession = new UseSession();

  constructor(private router: Router) {
    this.phoneNumber = this.useSession.getData();
  }

  confirmCode() {}
}
