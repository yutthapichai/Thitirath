import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Menu } from '../menu.models';
import { MenuService } from '../menu.service';
import { AuthService } from '../../../auth/auth.service';
import { MenucreateComponent } from '../menu-create/menu-create.component';


@Component({
  selector: 'app-menulist',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})


export class MenulistComponent implements OnInit, OnDestroy {
  private menuSubscrip: Subscription;
  private authSubscrip: Subscription;
  public menues: Menu[] = [];
  public Authenticated: boolean;
  public UserId: string;
  public menuId: string;
  public mode = 'create';
  public totalMenu   = 0;
  public menuPerpage = 5;
  public currentPage = 1;
  public pageSize    = [1, 5, 10, 20, 100];

  displayedColumns: string[] = ['position', 'name', 'min60', 'min90'];
  dataSource = this.menues;

  constructor(
    private objectMenuService: MenuService,
    private objectAuthService: AuthService,
    private objectMenuCreate: MenucreateComponent
  ) {}

  ngOnInit() {
    this.UserId        = this.objectAuthService.getUserId();
    this.Authenticated = this.objectAuthService.getAuth();
    this.authSubscrip  = this.objectAuthService.getAuthStatusListener().subscribe(
      isAuth => {
        this.Authenticated = isAuth;
      }
    );
    this.objectMenuService.fetchmenu(this.menuPerpage, this.currentPage);
    this.menuSubscrip   = this.objectMenuService.getMenuUpdateListener().subscribe(
      (menuData: { menues: Menu[]; menucount: number }) => {
        this.totalMenu = menuData.menucount;
        this.menues    = menuData.menues;
      }
    );
  }

  ngOnDestroy() {
    this.menuSubscrip.unsubscribe();
    this.authSubscrip.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.menuPerpage = pageData.pageSize;
    this.objectMenuService.fetchmenu(this.menuPerpage, this.currentPage);
  }

  requireEdit(menuId: string) {
    this.objectMenuCreate.onEdit(menuId);
  }

  onDelete(menuId: string) {
    if (confirm('Are you sure !!')) {
      this.objectMenuService.deletemenu(menuId);
    }
  }

}
