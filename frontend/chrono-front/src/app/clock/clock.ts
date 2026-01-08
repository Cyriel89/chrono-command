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
  protected displayTime: WritableSignal<Date> = signal(new Date());
  protected isRinging!: boolean;
  private hasRungThisMinute!: boolean;

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
    const shift: number = Number(this.clock.timeShift * 3600 * 1000);
    const offset: number = Number(this.clock.manualOffset * 60 * 1000);
    const time: Date = new Date(Date.now() + shift + offset);
    const minutes: number = time.getMinutes();
    const seconds: number = time.getSeconds();

    if (seconds === 0 && minutes % this.clock.alarmInterval === 0 && !this.hasRungThisMinute) {
      this.onRing();
      this.hasRungThisMinute = true;
    }
    this.hasRungThisMinute = false;

    return time
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

  public onRing(): void {
    const audio = new Audio('assets/sounds/alarm.mp3');
    audio.play()
    this.isRinging = true;
    setTimeout(() => {
      this.isRinging = false;
    }, 12000);
  }

  protected onUpdateInterval(e: any): void {
    this.clock.alarmInterval = Number(e.target.value);
    this.clocksService.updateClock(this.clock.id, { alarmInterval: this.clock.alarmInterval}).subscribe();
    console.log(e.target.value);
  }

}
