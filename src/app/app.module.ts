import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './components/navbar/navbar.module';
import { ApiInterceptor } from './core/interceptor/api.interceptor';
import { DateInterceptor } from './core/interceptor/date.interceptor';
import { NAVIGATOR } from './core/navigator.token';
import { WINDOW, WINDOW_PROVIDERS } from './core/window.service';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, NavbarModule],
  providers: [
    ...WINDOW_PROVIDERS,
    { provide: NAVIGATOR, useFactory: (window: Window) => window.navigator ?? {}, deps: [WINDOW] },
    { provide: HTTP_INTERCEPTORS, useExisting: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useExisting: DateInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } as MatFormFieldDefaultOptions },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
