import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDatasetsComponent } from './client-datasets.component';

describe('ClientDatasetsComponent', () => {
  let component: ClientDatasetsComponent;
  let fixture: ComponentFixture<ClientDatasetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientDatasetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientDatasetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
