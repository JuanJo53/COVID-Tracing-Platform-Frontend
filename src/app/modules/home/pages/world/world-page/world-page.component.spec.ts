import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldPageComponent } from './world-page.component';

describe('WorldPageComponent', () => {
  let component: WorldPageComponent;
  let fixture: ComponentFixture<WorldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
