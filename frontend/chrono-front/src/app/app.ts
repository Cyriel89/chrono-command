import { Component, OnInit, Renderer2, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { WebSocketService } from './services/web-socket.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit{
  protected readonly title = signal('chrono-front');
  private removeListener!: () => void;

  constructor(private renderer: Renderer2, private webSocketService: WebSocketService) {}

  ngOnInit(): void {
    this.removeListener = this.renderer.listen('document', 'click', () => {
      
      console.log('Premier clic détecté');
      this.unlockAudio()

      if (this.removeListener) {
        this.removeListener();
      }
    });  
  }

  unlockAudio() {
    const audio = new Audio('assets/sounds/alarm.mp3');
    audio.volume = 0;
    audio.muted = true;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
    }).catch((err) => {
      console.error('Echec du dévérouillage audio', err);
    })
    
  }
}
