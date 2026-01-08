import { Component, inject } from '@angular/core';
import { ClocksService } from '../services/clocks.service';
import { AsyncPipe } from '@angular/common';
import { Clock } from '../clock/clock';
import { ClockForm } from '../clock-form/clock-form';

@Component({
  selector: 'app-clock-list',
  imports: [AsyncPipe, Clock, ClockForm],
  templateUrl: './clock-list.html',
  styleUrl: './clock-list.scss',
})
export class ClockList {
  private clocksService = inject(ClocksService);
  clocks$ = this.clocksService.getClocks();

  protected refreshList() {
    this.clocks$ = this.clocksService.getClocks();
  }
}
