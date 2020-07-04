import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntityLocationComponent } from './create-entity-location.component';

describe('CreateEntityLocationComponent', () => {
  let component: CreateEntityLocationComponent;
  let fixture: ComponentFixture<CreateEntityLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEntityLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEntityLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
