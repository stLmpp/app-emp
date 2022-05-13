import { DefaultTitleStrategy, RouterStateSnapshot } from '@angular/router';
import { isNotNil } from 'st-utils';

export class PageTitleStrategy extends DefaultTitleStrategy {
  override buildTitle(snapshot: RouterStateSnapshot): string | undefined {
    let title = super.buildTitle(snapshot);
    if (isNotNil(title)) {
      title = `Emp - ${title}`;
    }
    return title;
  }
}
