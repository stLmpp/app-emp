import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { ConfirmDialogService } from '../../../components/confirm-dialog/confirm-dialog.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  constructor(
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  @Input() name!: string;
  @Input() totalToReceive!: number;

  @Output() readonly deleted = new EventEmitter<void>();

  loadingDeleteModal = false;

  onEdit($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  async onDelete($event: MouseEvent): Promise<void> {
    this.loadingDeleteModal = true;
    $event.preventDefault();
    $event.stopPropagation();
    const dialogRef = await this.confirmDialogService.confirm({
      title: `Delete user ${this.name}`,
      content: `This action can't be undone`,
      buttons: ['Close', { title: 'Delete', action: () => this.userService.delete(this.name) }],
    });
    dialogRef.afterClosed().subscribe(deleted => {
      if (deleted) {
        this.deleted.emit();
      }
    });
    this.loadingDeleteModal = false;
    this.changeDetectorRef.markForCheck();
  }
}
