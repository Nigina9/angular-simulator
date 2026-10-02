import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { routes } from './app.routes';
import { Theme } from './core/enums/Theme';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from './core/auth/auth.service';
import { provideAppInitializer, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { applicationConfiguration } from './core/configuration.token';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from './core/services/language.service';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

const initThemePreset = (): ThemePresetType => {
  const themeFromStorage: string | null = localStorage.getItem('theme');
  const savedTheme: Theme = themeFromStorage ? JSON.parse(themeFromStorage) : Theme.AURA;

  switch (savedTheme) {
    case Theme.NORA:
      return Nora;
    case Theme.LARA:
      return Lara;
    default:
      return Aura;
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([loggingInterceptor, errorInterceptor, authInterceptor])),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: {
          darkModeSelector: '.dark-mode'
        }
      }
    }),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      const languageService: LanguageService = inject(LanguageService);
      languageService.initializeLanguage();
      return firstValueFrom(authService.initAuth());
    }),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm'
      }
    },
    {
      provide: applicationConfiguration,
      useValue: {
        companyName: 'РУМТИБЕТ',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 1
      }
    },
      provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
    })
  ]

};
