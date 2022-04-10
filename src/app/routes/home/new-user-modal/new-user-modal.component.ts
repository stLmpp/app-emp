import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { UniqueUserIdValidatorFactory } from '../../../shared/validation/unique-user-id-validator-factory';
import { UniqueUserIdValidatorModule } from '../../../shared/validation/unique-user-id-validator.module';

@Component({
  selector: 'app-new-user-modal',
  templateUrl: './new-user-modal.component.html',
  styleUrls: ['./new-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewUserModalComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<NewUserModalComponent>,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly uniqueUserIdValidatorFactory: UniqueUserIdValidatorFactory
  ) {}

  readonly nameControl = new FormControl('', {
    asyncValidators: [this.uniqueUserIdValidatorFactory.create(this.changeDetectorRef)],
    validators: [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z][-_a-zA-Z0-9]{1,28}[a-zA-Z0-9]$/),
    ],
  });

  saving = false;

  onSave(): void {
    this.matDialogRef.disableClose = true;
    this.saving = true;
    this.nameControl.disable();
    this.userService
      .create({ id: this.nameControl.value })
      .pipe(
        finalize(() => {
          this.matDialogRef.disableClose = false;
          this.saving = false;
          this.nameControl.enable();
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe(user => {
        this.matDialogRef.close(user);
      });
  }
}

@NgModule({
  declarations: [NewUserModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    FormsModule,
    UniqueUserIdValidatorModule,
    ReactiveFormsModule,
  ],
})
export class NewUserModalModule {}
