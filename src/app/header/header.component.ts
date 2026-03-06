import { Component } from '@angular/core';
import { INavigation } from '../../interfaces/INavigation';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { MessageService } from '../../message.service';
import { inject } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  messageService: MessageService = inject(MessageService);
  companyName: string = 'румтибет';
  currentWidget!: 'counter' | 'timeAndDate';
  currentTimeAndDate: string = new Date().toString();
  counter: number = 0;

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

}
