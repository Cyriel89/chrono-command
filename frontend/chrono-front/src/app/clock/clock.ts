import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Clock as ClockModel } from '../models/clock.model';
@Component({
  selector: 'app-clock',
  imports: [TitleCasePipe, DatePipe],
  templateUrl: './clock.html',
  styleUrl: './clock.scss',
})
export class Clock {
  @Input() clock!: ClockModel;
}
