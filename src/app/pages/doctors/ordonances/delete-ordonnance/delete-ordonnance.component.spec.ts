import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrdonnanceComponent } from './delete-ordonnance.component';

describe('DeleteOrdonnanceComponent', () => {
  let component: DeleteOrdonnanceComponent;
  let fixture: ComponentFixture<DeleteOrdonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteOrdonnanceComponent]
    });
    fixture = TestBed.createComponent(DeleteOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
