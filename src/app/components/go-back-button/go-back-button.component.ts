import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { GoBackButtonService } from './go-back-button.service';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
})
export class GoBackButtonComponent implements OnDestroy {
  constructor(private readonly goBackButtonService: GoBackButtonService) {
    const [id, show$] = this.goBackButtonService.addButton();
    this._id = id;
    this.show$ = show$;
  }

  private readonly _id: number;

  @Input() link!: string | any[];

  readonly show$: Observable<boolean>;

  ngOnDestroy(): void {
    this.goBackButtonService.removeButton(this._id);
  }
}
