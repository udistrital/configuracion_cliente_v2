import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAplicacionesComponent } from './menu-aplicaciones.component';

describe('MenuAplicacionesComponent', () => {
  let component: MenuAplicacionesComponent;
  let fixture: ComponentFixture<MenuAplicacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAplicacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAplicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
