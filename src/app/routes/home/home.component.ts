import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { arrayUtil } from 'st-utils';

import { RouteDataEnum } from '../../models/route-data.enum';
import { User } from '../../models/user';
import { UserWithValues } from '../../models/user-with-values';
import { trackById } from '../../shared/utils/track-by';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  readonly trackByUser = trackById<UserWithValues>();
  users: readonly UserWithValues[] = this.activatedRoute.snapshot.data[RouteDataEnum.usersWithValues];

  onUserCreated($event: User): void {
    this.users = arrayUtil(this.users, 'id')
      .append({ ...$event, total: 0, totalReceived: 0, totalToReceive: 0 })
      .toArray();
  }

  onUserDeleted($event: User): void {
    this.users = arrayUtil(this.users, 'id').remove($event.id).toArray();
  }
}
