import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppointmentsComponent } from './add-appointments.component';

describe('AddAppointmentsComponent', () => {
  let component: AddAppointmentsComponent;
  let fixture: ComponentFixture<AddAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AddAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
