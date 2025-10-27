import { Component, effect, input, signal, Signal } from '@angular/core';
import { ResultsService } from './results.service';
import { Suggestion } from '../../core/Suggestion';
import { ResultCard } from "./result-card/result-card";
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Loading } from '../../core/loading';

@Component({
  selector: 'app-results',
  imports: [ResultCard, ReactiveFormsModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  providers: [ResultsService]
})
export class Results {
  
  protected form = new FormGroup({
    input: new FormControl<string | null>(null)
  })
  protected resultAmount: Signal<number>;
  protected latestError: Signal<Error | undefined>;;

  constructor(private resultsService: ResultsService) {

    this.resultAmount = this.resultsService.getResultsAmount();
    this.latestError = this.resultsService.getLatestError();
  }

  onSubmit() {
    this.resultsService.reset();
    const val = this.form.get('input')?.value?.trim();
    if (val && val > '') {
      this.resultsService.suggestNew(val, 9);
    }
    this.form.reset();
  }

}
