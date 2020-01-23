import { Component, OnInit } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { MenuItem } from './menu-item';
import { MENU_ITEMS } from './pages-menu';
import { MenuService } from '../@core/data/menu.service';


@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]='menu'></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})

export class PagesComponent implements OnInit {

  public menu = [];
  public results = [];
  object: MenuItem;
  hijo: MenuItem;
  hijo2: MenuItem;
  rol: String;
  dataMenu: any;
  roles: any;
  constructor(
    public menuws: MenuService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.menu = MENU_ITEMS;
  }
  /**
   * Translates one root menu item and every nested children
   * @param menuItem
   * @param prefix
   */
  
  /**
   * Resolves the translation key for a menu item. The prefix must be supplied for every child menu item
   * @param menuItem
   * @param prefix
   * @returns {string}
   */
  private static getMenuItemKey(menuItem: MenuItem, prefix: string = 'MENU'): string {
    if (menuItem.key == null) {
      throw new Error('Key not found');
    }

    const key = menuItem.key.toLowerCase();
    if (menuItem.children != null) {
      return prefix + '.' + key + '.' + key; // Translation is nested
    }
    return prefix + '.' + key;
  }

  /**
   * Used to remove the nested key for translations
   * @param key
   * @returns {string}
   */
  private static trimLastSelector(key: string): string {
    const keyParts = key.split('.');
    keyParts.pop();
    return keyParts.join('.');
  }
}
