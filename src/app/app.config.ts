import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { AuthInterceptor } from './services/Auth-Interceptor.service';
// import { LoginInterceptorService } from './services/login-interceptor.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideAnimationsAsync(),importProvidersFrom(HttpClientModule),
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}]
  };
  // {provide :HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi :true},
  // {provide :HTTP_INTERCEPTORS,useClass:LoginInterceptorService,multi :true},
