import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotioasComponent } from './notioas.component';

describe('NotioasComponent', () => {
  let component: NotioasComponent;
  let fixture: ComponentFixture<NotioasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotioasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotioasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
