import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardGeneralAdminComponent } from './dashboard-general-admin.component';

describe('DashboardGeneralAdminComponent', () => {
  let component: DashboardGeneralAdminComponent;
  let fixture: ComponentFixture<DashboardGeneralAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardGeneralAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardGeneralAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
