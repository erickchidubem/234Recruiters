import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyEntityLocationsComponent } from './view-my-entity-locations.component';

describe('ViewMyEntityLocationsComponent', () => {
  let component: ViewMyEntityLocationsComponent;
  let fixture: ComponentFixture<ViewMyEntityLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMyEntityLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyEntityLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
