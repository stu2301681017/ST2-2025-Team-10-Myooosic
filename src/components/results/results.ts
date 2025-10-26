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
  protected query = signal<string | undefined>(undefined, { equal: () => false }); // Always allow a new response from server, even with same prompt
  protected resultAmount: Loading<number>;

  constructor(private resultsService: ResultsService) {

    this.resultsService.followPrompt(this.query);
    this.resultAmount = this.resultsService.getResultsAmount();
  }

  onSubmit() {
    const val = this.form.get('input')?.value?.trim();
    if (val && val > '') {
      this.query.set(val);
    }
    this.form.reset();
  }

}
