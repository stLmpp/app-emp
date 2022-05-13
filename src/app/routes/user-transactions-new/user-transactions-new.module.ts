import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';
import { MaskDirective } from '../../directives/mask.directive';

import { UserTransactionsNewRoutingModule } from './user-transactions-new-routing.module';
import { UserTransactionsNewComponent } from './user-transactions-new.component';
import { UserTransactionsNewStep1Component } from './user-transactions-new-step1/user-transactions-new-step1.component';
import { UserTransactionsNewStep2Component } from './user-transactions-new-step2/user-transactions-new-step2.component';
import { UserTransactionsNewStep3Component } from './user-transactions-new-step3/user-transactions-new-step3.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    UserTransactionsNewComponent,
    UserTransactionsNewStep1Component,
    UserTransactionsNewStep2Component,
    UserTransactionsNewStep3Component,
  ],
  imports: [
    CommonModule,
    UserTransactionsNewRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    GoBackButtonComponent,
    MaskDirective,
    MatButtonModule,
  ],
})
export class UserTransactionsNewModule {}
