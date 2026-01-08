import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockForm } from './clock-form';

describe('ClockForm', () => {
  let component: ClockForm;
  let fixture: ComponentFixture<ClockForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClockForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClockForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
