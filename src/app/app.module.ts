import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import dateFnsLocalePt from 'date-fns/locale/pt-BR';
import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from 'ngx-currency';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { DateInterceptor } from './core/interceptor/date.interceptor';
import { NAVIGATOR } from './core/navigator.token';
import { WINDOW, WINDOW_PROVIDERS } from './core/window.service';

registerLocaleData(localePt);

function currencyMaskConfigFactory(): CurrencyMaskConfig {
  return {
    align: 'left',
    decimal: ',',
    allowZero: true,
    nullable: false,
    precision: 2,
    thousands: '.',
    prefix: '',
    suffix: '',
    allowNegative: true,
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NavbarComponent,
    MatDateFnsModule,
  ],
  providers: [
    ...WINDOW_PROVIDERS,
    { provide: NAVIGATOR, useFactory: (window: Window) => window.navigator ?? {}, deps: [WINDOW] },
    { provide: HTTP_INTERCEPTORS, useExisting: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useExisting: DateInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
    { provide: MAT_DATE_LOCALE, useValue: dateFnsLocalePt },
    { provide: CURRENCY_MASK_CONFIG, useFactory: currencyMaskConfigFactory },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000 } as MatSnackBarConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
