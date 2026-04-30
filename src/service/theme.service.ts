import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { ITheme } from '../interfaces/ITheme';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  localStorage: LocalStorageService = inject(LocalStorageService);

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDark$: Observable<boolean> = this.isDarkSubject.asObservable();

  private themeSubject = new BehaviorSubject<ITheme | null>(null);
  theme$: Observable<ITheme | null> = this.themeSubject.asObservable();

  themes: ITheme[] = [
    { 
      name: 'Aura', 
      preset: Aura 
    },
    { 
      name: 'Lara', 
      preset: Lara 
    },
    { 
      name: 'Nora', 
      preset: Nora 
    }
  ];

  constructor() {
    this.applyToggle();
    this.applyThemes();
  }

  toggleDarkMode(): void {
    this.isDarkSubject.next(!this.isDarkSubject.value);
    this.localStorage.saveValue('dark', String(this.isDarkSubject.value));
    const element: HTMLHtmlElement | null = document.querySelector('html');
    element?.classList.toggle('dark-theme');
  }

  applyToggle(): void {
    const isDark = this.localStorage.getValue('dark');
    this.isDarkSubject.next(isDark === 'true');
    if (isDark === "true") {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }  

  changeTreme(theme: ITheme): void {
    this.themeSubject.next(theme);
    usePreset(theme.preset);
    this.localStorage.saveValue('theme', theme.name);
  }

  applyThemes(): void {
    this.themeSubject.next(this.themes[0]);
    const theme: string | null = localStorage.getItem('theme');
    if (theme) {
      const foundTheme: ITheme | undefined = this.themes.find((currentTheme: ITheme) => currentTheme.name === theme);
      if (foundTheme) {
        this.themeSubject.next(foundTheme);
        usePreset(foundTheme.preset);
      }
    }
  }

}
