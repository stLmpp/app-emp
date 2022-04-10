import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterQuery } from '@stlmpp/router';

import { RouteParamEnum } from '../../models/route-param.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(private readonly routerQuery: RouterQuery) {}

  readonly idUser$ = this.routerQuery.selectParams(RouteParamEnum.idUser);
  isMouseOver = false;
}
