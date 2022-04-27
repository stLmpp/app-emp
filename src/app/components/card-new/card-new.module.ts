import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CardNewComponent } from './card-new.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CardNewComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatRippleModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule,
  ],
  exports: [CardNewComponent],
})
export class CardNewModule {}
