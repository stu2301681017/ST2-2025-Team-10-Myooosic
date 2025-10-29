import { CommonModule } from '@angular/common';
import { Component, computed, Signal, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, take, tap } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-links',
  imports: [RouterLink, CommonModule],
  templateUrl: './links.html',
  styleUrl: './links.scss'
})
export class Links { 

  protected route = signal<string | undefined>(undefined);
  protected loggedIn: Signal<boolean>;

  constructor(private activeRoute: ActivatedRoute, private authService: AuthService) {
    activeRoute.url
      .pipe(take(1))
      .pipe(map(url => url.length > 0 ? url[0].path : ''))
      .pipe(tap(this.route.set))
      .subscribe();

    this.loggedIn = this.authService.isLoggedIn();
  }

  protected logOff(event: Event): void {
    event.preventDefault();
    this.authService.logoff().subscribe();
  }

}
