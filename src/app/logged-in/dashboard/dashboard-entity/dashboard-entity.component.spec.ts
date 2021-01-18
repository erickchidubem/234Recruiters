import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEntityComponent } from './dashboard-entity.component';

describe('DashboardEntityComponent', () => {
  let component: DashboardEntityComponent;
  let fixture: ComponentFixture<DashboardEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
