import { Component } from '@angular/core';
import { Results } from "../../components/results/results";

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Results]
})
export class Home {

}
