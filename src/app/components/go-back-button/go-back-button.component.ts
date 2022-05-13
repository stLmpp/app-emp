import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { GoBackButtonService } from './go-back-button.service';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
})
export class GoBackButtonComponent {
  constructor(private readonly goBackButtonService: GoBackButtonService) {}

  @Input() link!: string | any[];

  readonly show$ = this.goBackButtonService.addButton();
}
