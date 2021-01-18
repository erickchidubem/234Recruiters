import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestCentersComponent } from './view-test-centers.component';

describe('ViewTestCentersComponent', () => {
  let component: ViewTestCentersComponent;
  let fixture: ComponentFixture<ViewTestCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTestCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
