import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackButtonComponent } from './go-back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [GoBackButtonComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  exports: [GoBackButtonComponent],
})
export class GoBackButtonModule {}
