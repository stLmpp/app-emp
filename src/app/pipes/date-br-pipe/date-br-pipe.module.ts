import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateBrPipe } from './date-br.pipe';

@NgModule({
  declarations: [DateBrPipe],
  exports: [DateBrPipe],
  imports: [CommonModule],
})
export class DateBrPipeModule {}
