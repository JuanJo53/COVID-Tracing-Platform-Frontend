import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoliviaDatasetsComponent } from './bolivia-datasets.component';

describe('BoliviaDatasetsComponent', () => {
  let component: BoliviaDatasetsComponent;
  let fixture: ComponentFixture<BoliviaDatasetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoliviaDatasetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoliviaDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
