import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTestCentersComponent } from './create-test-centers.component';

describe('CreateTestCentersComponent', () => {
  let component: CreateTestCentersComponent;
  let fixture: ComponentFixture<CreateTestCentersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTestCentersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTestCentersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
