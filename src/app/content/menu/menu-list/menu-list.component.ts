import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Thai oil massage', weight: 15, symbol: 60},
  {position: 2, name: 'Thai Massage and Rice berry ball compress', weight: 15, symbol: 60},
  {position: 3, name: 'Foot Massage', weight: 15, symbol: 60},
  {position: 4, name: 'Neck Shoulder Massage', weight: 15, symbol: 60},
  {position: 5, name: 'Aroma Massage', weight: 15, symbol: 60},
  {position: 6, name: 'Face Massage', weight: 15, symbol: 60},
  {position: 7, name: 'Herbal ball compress', weight: 15, symbol: 60},
];
@Component({
  selector: 'app-menulist',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenulistComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
