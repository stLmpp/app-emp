import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { TransactionService } from '../../../transaction/transaction.service';
import { UserTransactionsNewStoreService } from '../user-transactions-new-store.service';

@Component({
  selector: 'app-user-transactions-new-summary',
  templateUrl: './user-transactions-new-summary.component.html',
  styleUrls: ['./user-transactions-new-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewSummaryComponent {
  constructor(
    private readonly userTransactionsNewStoreService: UserTransactionsNewStoreService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly transactionService: TransactionService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar
  ) {}

  readonly dto = this.userTransactionsNewStoreService.getDto();

  loading = false;

  create(): void {
    this.loading = true;
    this.transactionService
      .create(this.userTransactionsNewStoreService.getIdUser()!, this.dto)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.userTransactionsNewStoreService.reset();
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          this.matSnackBar.open('New transaction added successfully!', 'Close');
        },
        error: () => {
          const snackbar = this.matSnackBar.open('Could not create transaction, please try again later', 'Try again');
          snackbar.onAction().subscribe(() => {
            this.create();
          });
        },
      });
  }
}
