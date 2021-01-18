import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContactTracedComponent } from './view-contact-traced.component';

describe('ViewContactTracedComponent', () => {
  let component: ViewContactTracedComponent;
  let fixture: ComponentFixture<ViewContactTracedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContactTracedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContactTracedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
