import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfvaccinationComponent } from './infvaccination.component';

describe('InfvaccinationComponent', () => {
  let component: InfvaccinationComponent;
  let fixture: ComponentFixture<InfvaccinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfvaccinationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfvaccinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
