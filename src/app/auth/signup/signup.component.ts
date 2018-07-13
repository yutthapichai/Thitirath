import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(public ObjectAuthService: AuthService) {}

  Signup(form: NgForm) {
    if ( form.invalid ) {
      return;
    } else {
      this.ObjectAuthService.signup(
        form.value.firstname,
        form.value.lastname,
        form.value.email,
        form.value.password
      );
    }
  }
}
