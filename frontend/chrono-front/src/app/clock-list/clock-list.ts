import { Component, inject, OnInit, signal } from '@angular/core';
import { ClocksService } from '../services/clocks.service';
import { ClockModel} from '../models/clock.model';
import { Clock } from '../clock/clock';
import { ClockForm } from '../clock-form/clock-form';
import { WebSocketService } from '../services/web-socket.service';

@Component({
  selector: 'app-clock-list',
  imports: [Clock, ClockForm],
  templateUrl: './clock-list.html',
  styleUrl: './clock-list.scss',
})
export class ClockList implements OnInit {
  private clocksService = inject(ClocksService);
  private webSocketService = inject(WebSocketService);
  protected clocks = signal<ClockModel[]>([]);

  ngOnInit(): void {
  
    this.refreshList();

    this.webSocketService.listen('clock-updated').subscribe((updatedClock: any) => {
      this.clocks.update((currentClocks) => {
        return currentClocks.map((clock) => {
          if (clock.id === updatedClock.id) {
            return updatedClock;
          }
          return clock;
        });
      });
      
    });
  }

  protected refreshList(): void {
    this.clocksService.getClocks().subscribe((data) => {
      this.clocks.set(data);
    });
  }

  protected onDeleteClock(id: any) {
    this.clocksService.deleteClock(Number(id)).subscribe({
      next: () => {
        this.refreshList();
      },
      error: (err: Error) => {
        console.error('Error deleting clock:', err);
      }
    });
  }
}