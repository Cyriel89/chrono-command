import { Component, inject } from '@angular/core';
import { ClocksService } from '../services/clocks.service';
import { AsyncPipe } from '@angular/common';
import { Clock } from '../clock/clock';

@Component({
  selector: 'app-clock-list',
  imports: [AsyncPipe, Clock],
  templateUrl: './clock-list.html',
  styleUrl: './clock-list.scss',
})
export class ClockList {
  private clocksService = inject(ClocksService);
  clocks$ = this.clocksService.getClocks();
}
