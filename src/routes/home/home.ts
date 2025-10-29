import { Component } from '@angular/core';
import { Results } from "../../components/results/results";
import { LoginRegisterLinks } from '../../components/login-register-links/login-register-links';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Results, LoginRegisterLinks]
})
export class Home {

}
