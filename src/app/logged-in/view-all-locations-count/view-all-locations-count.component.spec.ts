import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllLocationsCountComponent } from './view-all-locations-count.component';

describe('ViewAllLocationsCountComponent', () => {
  let component: ViewAllLocationsCountComponent;
  let fixture: ComponentFixture<ViewAllLocationsCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllLocationsCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllLocationsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
