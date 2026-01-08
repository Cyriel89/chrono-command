import { DatePipe, LowerCasePipe, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { Clock as ClockModel } from '../models/clock.model';
import { interval, Subscription } from 'rxjs';
import { ClocksService } from '../services/clocks.service';
@Component({
  selector: 'app-clock',
  imports: [TitleCasePipe, DatePipe, LowerCasePipe],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
})
export class Clock implements OnInit, OnDestroy {
  @Input() clock!: ClockModel;
  @Output() clockDeleted = new EventEmitter();

  constructor(private clocksService: ClocksService) {}

  private timerSubscription!: Subscription;
  public displayTime: WritableSignal<Date> = signal(new Date());

  ngOnInit(): void {
    this.displayTime.set(this.setTime());
    this.timerSubscription = interval(1000).subscribe(() => {
      this.displayTime.set(this.setTime());
    });
  }

  ngOnDestroy(): void {
    this.timerSubscription.unsubscribe();
  }

  protected setTime(): Date {
    if (!this.clock) return new Date();
    return new Date(Date.now() + Number(this.clock.timeShift * 3600 * 1000) + Number(this.clock.manualOffset * 60 * 1000));
  }

  protected onDelete(): void {
    this.clockDeleted.emit(this.clock.id);
  }

  protected onAjustTime(delta: number): void {
    this.clock.manualOffset += delta;
    this.setTime();
  }

  protected onResetTime(): void {
    this.clock.manualOffset = 0;
    this.setTime();
  }

}
