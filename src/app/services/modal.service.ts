import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';

export type LazyFn<T = any> = () => Promise<ComponentType<T>>;

@Injectable({ providedIn: MatDialogModule })
export class ModalService extends MatDialog {
  async openLazy<T, D = any, R = any>(
    componentFn: LazyFn<T>,
    config?: MatDialogConfig<D> & { module?: LazyFn }
  ): Promise<MatDialogRef<T, R>> {
    if (config?.module) {
      await config.module();
    }
    const component = await componentFn();
    return this.open(component, config);
  }
}
