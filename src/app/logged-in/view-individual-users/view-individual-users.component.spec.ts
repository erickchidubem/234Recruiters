import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewIndividualUsersComponent } from './view-individual-users.component';

describe('ViewIndividualUsersComponent', () => {
  let component: ViewIndividualUsersComponent;
  let fixture: ComponentFixture<ViewIndividualUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIndividualUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewIndividualUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
