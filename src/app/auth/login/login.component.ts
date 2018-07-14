import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(public objectloginservice: AuthService) {}

  login(form: NgForm) {
    if (form.invalid) {
      return;
    } else {
      this.objectloginservice.login(
        form.value.email,
        form.value.password
      );
    }
  }
}
