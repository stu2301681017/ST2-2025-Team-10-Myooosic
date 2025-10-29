import { Component, signal } from '@angular/core';
import { Results } from "../../components/results/results";
import { Links } from '../../components/links/links';
import { ApiService } from '../../core/api/api.service';
import { ApiRoute } from '../../core/api/api.routes';
import { QuerySave } from '../../core/QuerySave';
import { map, tap } from 'rxjs';
import { SavedCard } from './saved-card/saved-card';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.html',
  styleUrl: './saved.scss',
  imports: [Results, Links, SavedCard]
})
export class Saved {

  protected saves = signal<QuerySave[]>([]);

  constructor(private api: ApiService) {
    this.load();
  }

  public load(): void {
    this.api.get<QuerySave[]>(ApiRoute.PERSISTENCE, {})
        .pipe(tap(this.saves.set))
        .subscribe();
  }

}
