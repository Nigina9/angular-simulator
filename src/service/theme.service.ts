import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ITheme } from '../interfaces/ITheme';
import { LocalStorageService } from './local-storage.service';
import { Theme } from '../enums/Theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  localStorage: LocalStorageService = inject(LocalStorageService);

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.initModeFromStorage(),
  );
  isDarkMode$: Observable<boolean> = this.isDarkSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      const element: HTMLHtmlElement = document.querySelector('html')!;
      isDarkMode ? element.classList.add('dark-theme') : element.classList.remove('dark-theme');
    }),
  );

  themes: ITheme[] = [
    {
      name: Theme.AURA,
      preset: Aura,
    },
    {
      name: Theme.LARA,
      preset: Lara,
    },
    {
      name: Theme.NORA,
      preset: Nora,
    },
  ];

  private themeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(
    this.initThemeFromStorage(),
  );
  theme$: Observable<ITheme> = this.themeSubject.asObservable();

  private initModeFromStorage(): boolean {
    return this.localStorage.getValue('dark-mode') ?? false;
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkSubject.next(isDarkMode);
    this.localStorage.saveValue('dark-mode', this.isDarkSubject.value);
  }

  private initThemeFromStorage(): ITheme {
    const savedThemeName: string | null = this.localStorage.getValue('theme');
    const foundTheme: ITheme | undefined = this.themes.find(
      (theme) => theme.name === savedThemeName,
    );
    return foundTheme ?? this.themes[0];
  }

  changeTheme(theme: ITheme): void {
    this.themeSubject.next(theme);
    usePreset(theme.preset);
    this.localStorage.saveValue('theme', theme.name);
  }
}
