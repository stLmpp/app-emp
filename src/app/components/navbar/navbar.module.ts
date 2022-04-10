import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgLetModule } from '@stlmpp/utils';

import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, NgLetModule, RouterModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {}
