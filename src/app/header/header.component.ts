import { Component, OnInit } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MessageService } from '../../service/message.service';
import { inject } from '@angular/core';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../../service/theme.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../features/auth/auth.service';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from '../../service/local-storage.service';
import { applicationConfiguration } from '../configuration.token';
import { IApplicationConfiguration } from '../../interfaces/IApplicationConfiguration';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../service/language.service';
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, SelectButtonModule, AsyncPipe, DatePipe, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  themeService: ThemeService = inject(ThemeService);
  messageService: MessageService = inject(MessageService);
  authservice: AuthService = inject(AuthService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  configuration: IApplicationConfiguration = inject(applicationConfiguration);
  languageService: LanguageService = inject(LanguageService);

  currentWidget!: 'counter' | 'timeAndDate';
  currentTimeAndDate: Date = new Date();
  counter: number = 0;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  faRightFromBracket: IconDefinition = faRightFromBracket;
  lastEntry: string | null = this.localStorageService.getValue<string>('date-last-entry');

  navList: INavigation[] = [
    {
      id: 1,
      navItem: 'NAV.HOME',
      path: '/'
    },
    {
      id: 2,
      navItem: 'NAV.USERS',
      path: '/users-page'
    },
    {
      id: 3,
      navItem: 'NAV.POSTS',
      path: '/posts'
    }
  ];

  ngOnInit(): void {
    this.showСurrentTimeAndDate();
  }

  showСurrentTimeAndDate(): void {
    setInterval(() => {
      this.currentTimeAndDate = new Date();
    }, 1000);
  }

  increaseCounter(): void {
    this.counter++;
  }

  reduceCounter(): void {
    this.counter--;
  }

  switchWidget(widget: 'counter' | 'timeAndDate'): void {
    this.currentWidget = widget;
  }

  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }

  logout(): void {
    this.authservice.logout();
  }

}
