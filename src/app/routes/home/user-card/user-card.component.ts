import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() name!: string;
  @Input() totalToReceive!: number;

  onEdit($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }

  onDelete($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
  }
}
