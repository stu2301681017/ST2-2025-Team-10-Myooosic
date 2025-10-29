import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-register-links',
  imports: [RouterLink, CommonModule],
  templateUrl: './login-register-links.html',
  styleUrl: './login-register-links.scss'
})
export class LoginRegisterLinks {


  constructor() {
  }


}
