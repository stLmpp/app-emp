import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoBackButtonComponent {
  @Input() routerLink!: string | any[];
}
