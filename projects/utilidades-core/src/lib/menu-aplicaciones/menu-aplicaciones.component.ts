import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menu-aplicaciones',
  templateUrl: './menu-aplicaciones.component.html',
  styleUrls: ['./menu-aplicaciones.component.scss']
})
export class MenuAplicacionesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  public abrirMenu(){
    var menu=document.getElementById('menu')
    if (!menu.className.includes("menu_is_active")){
        console.log("entro a funcion")
        menu.classList.add('menu_is_active')
    }else{
        menu.classList.remove('menu_is_active')
    }
  }
}
