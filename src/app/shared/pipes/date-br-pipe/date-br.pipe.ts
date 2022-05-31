import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { isString } from 'st-utils';

@Pipe({ name: 'dateBr', standalone: true })
export class DateBrPipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private readonly locale: string) {}

  private _formatTime(time: string | boolean | undefined): string {
    if (!time) {
      return '';
    }
    if (isString(time)) {
      return time.startsWith(' ') ? time : ` ${time}`;
    }
    return ' HH:mm:ss';
  }

  transform(value: string | Date | number, time?: string | boolean, locale?: string): string {
    const format = `dd/MM/yyyy${this._formatTime(time)}`;
    return formatDate(value, format, locale ?? this.locale);
  }
}
