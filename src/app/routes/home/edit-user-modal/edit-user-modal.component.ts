import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgModule } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { UserService } from '../../../services/user.service';
import { catchAndThrow } from '../../../shared/utils/catch-and-throw';
import { UniqueUserIdValidatorFactory } from '../../../shared/validation/unique-user-id-validator-factory';
import { UniqueUserIdValidatorModule } from '../../../shared/validation/unique-user-id-validator.module';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserModalComponent {
  constructor(
    private readonly matDialogRef: MatDialogRef<EditUserModalComponent>,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly uniqueUserIdValidatorFactory: UniqueUserIdValidatorFactory,
    @Inject(MAT_DIALOG_DATA) public readonly idUser: string
  ) {}

  readonly form = new FormGroup({
    name: new FormControl(this.idUser, {
      asyncValidators: [this.uniqueUserIdValidatorFactory.create(this.changeDetectorRef, [this.idUser])],
      validators: [
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[a-zA-Z][-_a-zA-Z\d]{1,28}[a-zA-Z\d]$/),
      ],
      initialValueIsDefault: true,
    }),
  });
  readonly nameControl = this.form.controls.name;

  saving = false;

  onSave(): void {
    if (this.form.invalid) {
      return;
    }
    this.matDialogRef.disableClose = true;
    this.saving = true;
    this.form.disable();
    const formValue = this.form.getRawValue();
    this.userService
      .update(this.idUser, { id: formValue.name })
      .pipe(
        catchAndThrow(() => {
          this.matDialogRef.disableClose = false;
          this.saving = false;
          this.form.enable();
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe(user => {
        this.matDialogRef.close(user);
      });
  }
}

@NgModule({
  declarations: [EditUserModalComponent],
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
export class EditUserModalModule {}
