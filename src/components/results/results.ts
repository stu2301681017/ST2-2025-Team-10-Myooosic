import { Component, computed, effect, input, signal, Signal } from '@angular/core';
import { ResultsService } from './results.service';
import { ResultCard } from "./result-card/result-card";
import { FormGroup, FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-results',
  imports: [ResultCard, ReactiveFormsModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './results.html',
  styleUrl: './results.scss',
  providers: [ResultsService]
})
export class Results {
  
  protected form = new FormGroup({
    input: new FormControl<string | null>(null)
  })
  protected resultAmount: Signal<number>;
  protected latestError: Signal<Error | undefined>;

  constructor(private resultsService: ResultsService) {

    this.resultAmount = this.resultsService.getResultsAmount();
    this.latestError = this.resultsService.getLatestError();
  }

  protected readonly indices = computed(() =>
    Array.from({ length: this.resultAmount() }, (_, i) => i)
  );

  onSubmit() {
    this.resultsService.reset();
    const val = this.form.get('input')?.value?.trim();
    if (val && val > '') {
      this.resultsService.suggestNew(val, 6);
    }
  }

}
