import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Menu } from './menu.models';
import { environment } from '../../../environments/environment';

const Backend_url = environment.apiUrl + '/menu/';

@Injectable({ providedIn: 'root' })

export class MenuService {

  private menu: Menu[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  public addmenu(name: string, min60: any, min90: any, detail: string, image: File) {

    const menuData = new FormData();
    menuData.append('name', name);
    menuData.append('min60', min60);
    menuData.append('min90', min90);
    menuData.append('detail', detail);
    menuData.append('image', image, name);

    this.http.post( Backend_url, menuData).subscribe(
      Response => {
        console.log(Response);
      }
    );

  }

}
