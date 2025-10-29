import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AudioService {

  private currentAudio: HTMLAudioElement | null = null;

  playAudio(newAudio: HTMLAudioElement) {
    if (this.currentAudio && this.currentAudio !== newAudio) {
      this.currentAudio.pause();
    }
    
    this.currentAudio = newAudio;
  }
}