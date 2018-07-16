import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

import { Menu } from '../menu.models';
import { MenuService } from '../menu.service';




@Component({
  selector: 'app-menulist',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenulistComponent implements OnInit, OnDestroy {
  private menuSubscip: Subscription;
  public menues: Menu[] = [];
  public totalMenu = 0;
  public menuPerpage = 5;
  public currentPage = 1;
  public pageSize = [1, 5, 10, 20, 100];

  displayedColumns: string[] = ['position', 'name', 'min60', 'min90'];
  dataSource = this.menues;

  constructor(private objectMenuService: MenuService) {}

  ngOnInit() {
    this.objectMenuService.fetchmenu(this.menuPerpage, this.currentPage);
    this.menuSubscip = this.objectMenuService.getMenuUpdateListener().subscribe(
      (menuData: { menues: Menu[]; menucount: number }) => {
        this.totalMenu = menuData.menucount;
        this.menues = menuData.menues;
      }
    );
  }

  ngOnDestroy() {
    this.menuSubscip.unsubscribe();
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.menuPerpage = pageData.pageSize;
    this.objectMenuService.fetchmenu(this.menuPerpage, this.currentPage);
  }

}
