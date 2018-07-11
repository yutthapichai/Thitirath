import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatInputModule,
  MatCardModule,
  MatStepperModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatTableModule,
  MatProgressSpinnerModule
 } from '@angular/material';

@NgModule({
  exports: [
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatInputModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class AngularMaterialModule {}
