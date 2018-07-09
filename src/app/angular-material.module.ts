import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule
 } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule
  ]
})
export class AngularMaterialModule {}
