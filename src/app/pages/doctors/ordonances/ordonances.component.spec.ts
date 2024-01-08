import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonancesComponent } from './ordonances.component';

describe('OrdonancesComponent', () => {
  let component: OrdonancesComponent;
  let fixture: ComponentFixture<OrdonancesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdonancesComponent]
    });
    fixture = TestBed.createComponent(OrdonancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
