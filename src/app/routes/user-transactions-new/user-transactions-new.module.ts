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

import { UserTransactionsNewDateAndValueComponent } from './user-transactions-new-date-and-value/user-transactions-new-date-and-value.component';
import { UserTransactionsNewNameAndDescriptionComponent } from './user-transactions-new-name-and-description/user-transactions-new-name-and-description.component';
import { UserTransactionsNewPersonComponent } from './user-transactions-new-person/user-transactions-new-person.component';
import { UserTransactionsNewRoutingModule } from './user-transactions-new-routing.module';
import { UserTransactionsNewSummaryComponent } from './user-transactions-new-summary/user-transactions-new-summary.component';
import { UserTransactionsNewComponent } from './user-transactions-new.component';

@NgModule({
  declarations: [
    UserTransactionsNewComponent,
    UserTransactionsNewNameAndDescriptionComponent,
    UserTransactionsNewPersonComponent,
    UserTransactionsNewDateAndValueComponent,
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
