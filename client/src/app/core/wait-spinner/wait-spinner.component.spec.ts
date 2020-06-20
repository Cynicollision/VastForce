import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitSpinnerComponent } from './wait-spinner.component';
import { MatSpinner } from '@angular/material';

describe('WaitSpinnerComponent', () => {
  let component: WaitSpinnerComponent;
  let fixture: ComponentFixture<WaitSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatSpinner,
        WaitSpinnerComponent,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
