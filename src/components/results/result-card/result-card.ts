import { Component, computed, input, Signal, viewChild } from '@angular/core';
import { Suggestion } from '../../../core/Suggestion';
import { ResultsService } from '../results.service';
import { Loading } from '../../../core/loading';
import { AudioService } from '../../../core/audio.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@Component({
  selector: 'app-result-card',
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule],
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
  
  constructor(private resultsService: ResultsService, private audioService: AudioService) {
    this.result = this.resultsService.getSuggestionByIndex(this.resultIndex);
  }

  protected playAudio(audioElement: HTMLAudioElement) {
    this.audioService.playAudio(audioElement);
  }

  protected reload() {
    const prompt = this.result.value()?.prompt;
    const index = this.resultIndex();
    if (!prompt || index == null) { return; }
    this.resultsService.reSuggest(prompt, index);
  }

}
