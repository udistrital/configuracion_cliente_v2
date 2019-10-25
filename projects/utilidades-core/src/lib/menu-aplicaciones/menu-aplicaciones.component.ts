import { Component, OnInit } from '@angular/core';
import { MenuAplicacionesService } from '../services/menuAplicaciones.service';

@Component({
  selector: 'menu-aplicaciones',
  templateUrl: './menu-aplicaciones.component.html',
  styleUrls: ['./menu-aplicaciones.component.scss'],
})
export class MenuAplicacionesComponent implements OnInit {
  activo: any;

  constructor( public menuService: MenuAplicacionesService ) {}

  redirect(link) {
    window.open(link, '_blank');
  }

  ngOnInit(): void {
    this.menuService.activo$
    .subscribe((isActive: any) => {
      const { activo } = isActive;
      this.activo = activo;
    });
  }

}
