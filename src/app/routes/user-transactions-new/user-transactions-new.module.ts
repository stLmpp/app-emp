import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserTransactionsNewRoutingModule } from './user-transactions-new-routing.module';
import { UserTransactionsNewComponent } from './user-transactions-new.component';
import { GoBackButtonModule } from '../../components/go-back-button/go-back-button.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserTransactionsNewComponent],
  imports: [
    CommonModule,
    UserTransactionsNewRoutingModule,
    GoBackButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class UserTransactionsNewModule {}
