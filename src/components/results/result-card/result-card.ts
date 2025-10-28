import { Component, computed, input, Signal } from '@angular/core';
import { Suggestion } from '../../../core/Suggestion';
import { ResultsService } from '../results.service';
import { Loading } from '../../../core/loading';

@Component({
  selector: 'app-result-card',
  imports: [],
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss'
})
export class ResultCard {

  public resultIndex = input<number>();
  protected result: Loading<Suggestion>;

  protected length = computed(() => {
    let allSeconds = this.result.value()?.song.length ?? 0;
    let seconds = allSeconds % 60;
    let minutes = Math.floor(allSeconds / 60);
    let hours = Math.floor(allSeconds / 3600);
    return { seconds, minutes, hours};
  })
  
  constructor(private resultsService: ResultsService) {
    this.result = this.resultsService.getSuggestionByIndex(this.resultIndex);
  }

}
