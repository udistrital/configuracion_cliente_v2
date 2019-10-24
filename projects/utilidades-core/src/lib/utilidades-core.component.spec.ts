import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilidadesCoreComponent } from './utilidades-core.component';

describe('UtilidadesCoreComponent', () => {
  let component: UtilidadesCoreComponent;
  let fixture: ComponentFixture<UtilidadesCoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilidadesCoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilidadesCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
