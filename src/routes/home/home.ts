import { Component } from '@angular/core';
import { Results } from "../../components/results/results";
import { Links } from '../../components/links/links';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [Results, Links]
})
export class Home {

}
