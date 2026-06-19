import { Component } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MessageService } from '../../service/message.service';
import { inject } from '@angular/core';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../../service/theme.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  themeService: ThemeService = inject(ThemeService);
  messageService: MessageService = inject(MessageService);
  companyName: string = 'румтибет';
  currentWidget!: 'counter' | 'timeAndDate';
  currentTimeAndDate: string = new Date().toString();
  counter: number = 0;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;

  navList: INavigation[] = [
    {
      id: 1,
      navItem: 'Главная',
      path: '/'
    },
    {
      id: 2,
      navItem: 'Пользователи',
      path: '/users-page'
    },
    {
      id: 3,
      navItem: 'Поcты',
      path: '/posts'
    }
  ];

  constructor() {
    this.showСurrentTimeAndDate();
  }

  showСurrentTimeAndDate(): void {
    setInterval(() => {
      this.currentTimeAndDate = new Date().toLocaleString();
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

}
