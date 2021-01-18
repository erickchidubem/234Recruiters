import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraceHistoryComponent } from './trace-history.component';

describe('TraceHistoryComponent', () => {
  let component: TraceHistoryComponent;
  let fixture: ComponentFixture<TraceHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraceHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
