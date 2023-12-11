import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDisponibilityComponent } from './delete-disponibility.component';

describe('DeleteDisponibilityComponent', () => {
  let component: DeleteDisponibilityComponent;
  let fixture: ComponentFixture<DeleteDisponibilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteDisponibilityComponent]
    });
    fixture = TestBed.createComponent(DeleteDisponibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
