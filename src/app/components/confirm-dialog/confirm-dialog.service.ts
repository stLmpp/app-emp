import { Injectable } from '@angular/core';
import { MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog/dialog-ref';
import { Observable } from 'rxjs';

import { ModalService } from '../../services/modal.service';

import type { ConfirmDialogComponent } from './confirm-dialog.component';

export type ConfirmDialogRef = MatDialogRef<ConfirmDialogComponent, boolean>;

export type ConfirmDialogButtonAction = ((matDialogRef: ConfirmDialogRef) => any) | Observable<any> | boolean;

export interface ConfirmDialogButton {
  title: string;
  action: ConfirmDialogButtonAction;
}

export interface ConfirmDialogOptions {
  title?: string;
  content?: string;
  buttons?: Array<ConfirmDialogButton | string>;
}

@Injectable({ providedIn: MatDialogModule })
export class ConfirmDialogService {
  constructor(private readonly modalService: ModalService) {}

  async confirm(options: ConfirmDialogOptions, matOptions?: MatDialogConfig): Promise<ConfirmDialogRef> {
    return this.modalService.openLazy(() => import('./confirm-dialog.component').then(m => m.ConfirmDialogComponent), {
      ...matOptions,
      data: options,
    });
  }
}
