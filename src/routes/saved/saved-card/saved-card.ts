import { Component, computed, input, Signal, viewChild } from '@angular/core';
import { Suggestion } from '../../../core/Suggestion';
import { Loading } from '../../../core/loading';
import { AudioService } from '../../../core/audio.service';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'


@Component({
  selector: 'app-saved-card',
  imports: [MatIconModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './saved-card.html',
  styleUrl: './saved-card.scss'
})
export class SavedCard {

  public result = input<Suggestion>();

  protected length = computed(() => {
    let allSeconds = this.result()?.song.length ?? 0;
    let seconds = allSeconds % 60;
    let minutes = Math.floor(allSeconds / 60);
    let hours = Math.floor(allSeconds / 3600);
    return { seconds, minutes, hours};
  })
  
  constructor(private audioService: AudioService) {
  }

  protected playAudio(audioElement: HTMLAudioElement) {
    this.audioService.playAudio(audioElement);
  }

}
