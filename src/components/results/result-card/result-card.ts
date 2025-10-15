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
  
  constructor(private resultsService: ResultsService) {
    this.result = this.resultsService.getResultByIndex(this.resultIndex);
  }

}
