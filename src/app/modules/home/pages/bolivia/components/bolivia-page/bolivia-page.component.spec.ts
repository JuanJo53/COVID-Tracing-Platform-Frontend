import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoliviaPageComponent } from './bolivia-page.component';

describe('BoliviaPageComponent', () => {
  let component: BoliviaPageComponent;
  let fixture: ComponentFixture<BoliviaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoliviaPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoliviaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
