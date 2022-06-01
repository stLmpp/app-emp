import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxCurrencyModule } from 'ngx-currency';

import { TransactionFlowDateAndTotalTitleResolver } from './transaction-flow-date-and-total-title.resolver';
import { TransactionFlowNameAndDescriptionTitleResolver } from './transaction-flow-name-and-description-title.resolver';
import { TransactionFlowPersonTitleResolver } from './transaction-flow-person-title.resolver';
import { TransactionFlowSummaryTitleResolver } from './transaction-flow-summary-title.resolver';
import { UserTransactionsNewDateAndTotalGuard } from './user-transactions-new-date-and-total.guard';
import { UserTransactionsNewDateAndTotalComponent } from './user-transactions-new-date-and-total/user-transactions-new-date-and-total.component';
import { UserTransactionsNewNameAndDescriptionGuard } from './user-transactions-new-name-and-description.guard';
import { UserTransactionsNewNameAndDescriptionComponent } from './user-transactions-new-name-and-description/user-transactions-new-name-and-description.component';
import { UserTransactionsNewPersonGuard } from './user-transactions-new-person.guard';
import { UserTransactionsNewPersonComponent } from './user-transactions-new-person/user-transactions-new-person.component';
import { UserTransactionsNewResetStoreGuard } from './user-transactions-new-reset-store.guard';
import { UserTransactionsNewRoutingModule } from './user-transactions-new-routing.module';
import { UserTransactionsNewSummaryComponent } from './user-transactions-new-summary/user-transactions-new-summary.component';
import { UserTransactionsNewComponent } from './user-transactions-new.component';

import { GoBackButtonComponent } from '@shared/components/go-back-button/go-back-button.component';
import { AutoFocusDirective } from '@shared/directives/auto-focus.directive';
import { ButtonActionsDirective } from '@shared/directives/button-actions.directive';
import { MaskDirective } from '@shared/directives/mask.directive';
import { DateBrPipe } from '@shared/pipes/date-br-pipe/date-br.pipe';

@NgModule({
  declarations: [
    UserTransactionsNewComponent,
    UserTransactionsNewNameAndDescriptionComponent,
    UserTransactionsNewPersonComponent,
    UserTransactionsNewDateAndTotalComponent,
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
    NgxCurrencyModule,
    DateBrPipe,
    MatSnackBarModule,
    AutoFocusDirective,
  ],
  providers: [
    UserTransactionsNewResetStoreGuard,
    UserTransactionsNewPersonGuard,
    UserTransactionsNewNameAndDescriptionGuard,
    UserTransactionsNewDateAndTotalGuard,
    TransactionFlowNameAndDescriptionTitleResolver,
    TransactionFlowPersonTitleResolver,
    TransactionFlowDateAndTotalTitleResolver,
    TransactionFlowSummaryTitleResolver,
  ],
})
export class UserTransactionsNewModule {}
