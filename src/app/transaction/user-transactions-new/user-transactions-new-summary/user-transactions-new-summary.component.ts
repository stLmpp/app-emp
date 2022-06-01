import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';

import { TransactionFlowPort } from '../../transaction-flow.port';
import { TransactionService } from '../../transaction.service';

@Component({
  selector: 'app-user-transactions-new-summary',
  templateUrl: './user-transactions-new-summary.component.html',
  styleUrls: ['./user-transactions-new-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTransactionsNewSummaryComponent {
  constructor(
    private readonly transactionFlowPort: TransactionFlowPort,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly transactionService: TransactionService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly matSnackBar: MatSnackBar
  ) {}

  readonly dto = this.transactionFlowPort.getDto();
  readonly messages = this.transactionFlowPort.messages;

  loading = false;

  create(): void {
    this.loading = true;
    this.transactionService
      .create(this.transactionFlowPort.getIdUser()!, this.dto)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe({
        next: () => {
          this.transactionFlowPort.reset();
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
          this.matSnackBar.open(this.messages.saveSuccessful, 'Close');
        },
        error: () => {
          const snackbar = this.matSnackBar.open(this.messages.saveError, 'Try again');
          snackbar.onAction().subscribe(() => {
            this.create();
          });
        },
      });
  }
}
