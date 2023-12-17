import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAppointmentComponent } from './delete-appointment.component';

describe('DeleteAppointmentComponent', () => {
  let component: DeleteAppointmentComponent;
  let fixture: ComponentFixture<DeleteAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAppointmentComponent]
    });
    fixture = TestBed.createComponent(DeleteAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
