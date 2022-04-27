import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { BooleanInput, coerceBooleanProperty } from 'st-utils';

@Component({
  selector: 'app-card-new',
  templateUrl: './card-new.component.html',
  styleUrls: ['./card-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardNewComponent {
  private _disabled = false;

  @Input() icon = 'add';
  @Input() tooltip?: string;
  @Input() routerLink?: string | any[];

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(loading: BooleanInput) {
    this._disabled = coerceBooleanProperty(loading);
  }

  @Output() readonly cardClick = new EventEmitter<MouseEvent>();

  onClick($event: MouseEvent): void {
    if (this._disabled) {
      return;
    }
    this.cardClick.emit($event);
  }
}
