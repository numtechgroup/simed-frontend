import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrdonnanceComponent } from './view-ordonnance.component';

describe('ViewOrdonnanceComponent', () => {
  let component: ViewOrdonnanceComponent;
  let fixture: ComponentFixture<ViewOrdonnanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrdonnanceComponent]
    });
    fixture = TestBed.createComponent(ViewOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
