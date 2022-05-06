import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import Inputmask from 'inputmask';

import { InputmaskService } from '../services/inputmask.service';

export type MaskType = 'date';

@Directive({
  selector: '[appMask]',
  standalone: true,
})
export class MaskDirective implements OnInit {
  constructor(
    private readonly elementRef: ElementRef<HTMLInputElement>,
    private readonly renderer2: Renderer2,
    private readonly inputmaskService: InputmaskService
  ) {}

  private readonly _maskTypeMap: Record<MaskType, () => Inputmask.Instance> = {
    date: () =>
      this.inputmaskService.createMask('datetime', {
        inputFormat: 'dd/mm/yyyy',
        placeholder: 'DD/MM/YYYY',
      }),
  };

  private _isInitialized = false;

  private _mask?: Inputmask.Instance;

  @Input('appMask')
  set mask(mask: MaskType) {
    if (this._mask) {
      this._mask.remove();
    }
    this._mask = this._maskTypeMap[mask]();
    if (this._isInitialized) {
      this._mask.mask(this.elementRef.nativeElement);
    }
  }

  ngOnInit(): void {
    if (!this._mask) {
      throw new Error('MaskDirective Input appMask is required');
    }
    this._mask.mask(this.elementRef.nativeElement);
    this._isInitialized = true;
  }
}
