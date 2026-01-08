import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { Field, form, required, submit } from '@angular/forms/signals';
import { ClockFormModel } from '../models/clock-form.model';
import { ClockFormService } from '../services/clock-form.service';

@Component({
  selector: 'app-clock-form',
  imports: [CommonModule, Field, LowerCasePipe],
  templateUrl: './clock-form.html',
  styleUrl: './clock-form.scss',
})
export class ClockForm {
  @Output() clockAdded = new EventEmitter();
  protected readonly model = signal<ClockFormModel>({
    name: '',
    room: '',
    timeShift: 0,
    status: '',
  });

  protected readonly form = form(this.model, clock => {
    required(clock.name, { message: 'Vous devez nommer l\'horloge.' });
    required(clock.room, { message: 'Vous devez nommer une salle pour l\'horloge.' });
    required(clock.status, { message: 'Vous devez choisir un statut.' });
  });

  private readonly clockFormService = inject(ClockFormService);

  protected onSubmit(e: Event) {
    e.preventDefault();

    submit(this.form, async f => {
      const value = f().value();
      const result = await this.clockFormService.addClock(value);

      if (result.status === 'error') {
        const errors: any[] = [];

        if (result.fieldErrors.name) {
          errors.push({
            field: f.name,
            kind: 'server',
            message: result.fieldErrors.name
          });
        }

        return errors.length ? errors : undefined
      }

      console.log('Submitted', value);
      this.clockAdded.emit();
      return undefined;
    });
  }
}


