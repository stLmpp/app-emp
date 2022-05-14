import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { GoBackButtonComponent } from '../../components/go-back-button/go-back-button.component';
import { ButtonActionsDirective } from '../../directives/button-actions.directive';
import { MaskDirective } from '../../directives/mask.directive';

import { UserTransactionsNewRoutingModule } from './user-transactions-new-routing.module';
import { UserTransactionsNewStep1Component } from './user-transactions-new-step1/user-transactions-new-step1.component';
import { UserTransactionsNewStep2Component } from './user-transactions-new-step2/user-transactions-new-step2.component';
import { UserTransactionsNewStep3Component } from './user-transactions-new-step3/user-transactions-new-step3.component';
import { UserTransactionsNewSummaryComponent } from './user-transactions-new-summary/user-transactions-new-summary.component';
import { UserTransactionsNewComponent } from './user-transactions-new.component';

@NgModule({
  declarations: [
    UserTransactionsNewComponent,
    UserTransactionsNewStep1Component,
    UserTransactionsNewStep2Component,
    UserTransactionsNewStep3Component,
    UserTransactionsNewSummaryComponent,
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
    ButtonActionsDirective,
    MatAutocompleteModule,
  ],
})
export class UserTransactionsNewModule {}
