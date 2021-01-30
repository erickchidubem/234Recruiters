import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExposedIndividualsComponent } from './view-exposed-individuals.component';

describe('ViewExposedIndividualsComponent', () => {
  let component: ViewExposedIndividualsComponent;
  let fixture: ComponentFixture<ViewExposedIndividualsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExposedIndividualsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExposedIndividualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
