import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllEntitiesComponent } from './view-all-entities.component';

describe('ViewAllEntitiesComponent', () => {
  let component: ViewAllEntitiesComponent;
  let fixture: ComponentFixture<ViewAllEntitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllEntitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
