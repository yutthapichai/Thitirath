import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Menu } from './menu.models';
import { environment } from '../../../environments/environment';


const Backend_url = environment.apiUrl + '/menu/';

@Injectable({ providedIn: 'root' })

export class MenuService {

  private menu: Menu[] = [];
  private menuUpdated = new Subject<{ menues: Menu[], menucount: number }>();

  constructor(private http: HttpClient, private router: Router) {}

  public fetchmenu(Perpage: number, currentPage: number) {
    const menuPerpage = `?pagesize=${Perpage}&page=${currentPage}`;
    this.http.get<{ message: string; menues: any; maxMenu: number }>(Backend_url + menuPerpage).pipe(
      map(
        menuData => {
          // console.log(menuData.message);
          return {
            menues: menuData.menues.map(
              menu => {
                return {
                  id: menu._id,
                  name: menu.name,
                  min60: menu.min60,
                  min90: menu.min90,
                  detail: menu.detail,
                  imagePath: menu.imagePath,
                  creator: menu.creator
                };
              }
            ),
            maxmenues: menuData.maxMenu
          };
        }
      )
    ).subscribe(
      subMenuData => {
        this.menu = subMenuData.menues;
        this.menuUpdated.next({
          menues: [...this.menu],
          menucount: subMenuData.maxmenues
        });
      }
    );
  }

  public addmenu(name: string, min60: any, min90: any, detail: string, image: File) {
    const menuData = new FormData();
    menuData.append('name', name);
    menuData.append('min60', min60);
    menuData.append('min90', min90);
    menuData.append('detail', detail);
    menuData.append('image', image, name);

    this.http.post<{ message: string, menu: Menu, maxcount: number }>( Backend_url, menuData).subscribe(
      Response => {
        // console.log(Response.message);
        const menus: Menu = {
          id: Response.menu.id,
          name: name,
          min60: min60,
          min90: min90,
          detail: detail,
          imagePath: Response.menu.imagePath,
          creator: Response.menu.creator
        };
        this.menu.push(menus);
        this.menuUpdated.next({
          menues: [...this.menu],
          menucount: Response.maxcount
        });
      }
    );
  }

  public deletemenu(menuId: string) {
    this.http.delete<{ message: string, maxMenu: number}>(Backend_url + menuId).subscribe(
      Response => {
        const updateMenues = this.menu.filter(menu => menu.id !== menuId);
        this.menu = updateMenues;
        this.menuUpdated.next({
          menues: [...this.menu],
          menucount: Response.maxMenu
        });
      }
    );
  }

  public editmenu(id: string) {
    return this.http.get<{
      _id: string,
      name: string,
      min60: number,
      min90: number,
      detail: string,
      imagePath: string,
      creator: string
    }>(Backend_url + id);
  }

  public getMenuUpdateListener() {
    return this.menuUpdated.asObservable();
  }

}
