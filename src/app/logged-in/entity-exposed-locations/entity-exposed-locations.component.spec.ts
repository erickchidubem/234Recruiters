import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityExposedLocationsComponent } from './entity-exposed-locations.component';

describe('EntityExposedLocationsComponent', () => {
  let component: EntityExposedLocationsComponent;
  let fixture: ComponentFixture<EntityExposedLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityExposedLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityExposedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
