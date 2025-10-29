import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, take, tap } from 'rxjs';

@Component({
  selector: 'app-links',
  imports: [RouterLink, CommonModule],
  templateUrl: './links.html',
  styleUrl: './links.scss'
})
export class Links { 

  protected route = signal<string | undefined>(undefined);

  constructor(private activeRoute: ActivatedRoute) {
    activeRoute.url
      .pipe(take(1))
      .pipe(map(url => url.length > 0 ? url[0].path : ''))
      .pipe(tap(this.route.set))
      .subscribe();
  }


}
