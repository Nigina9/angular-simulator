import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { IOffer } from '../interfaces/IOffer';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../interfaces/ILocation';
import { IParticipant } from '../interfaces/IParticipant';
import { IDestination } from '../interfaces/IDestination';
import { IArticle } from '../interfaces/IArticle';
import { NgTemplateOutlet } from '@angular/common';
import { MessageService } from '../message.service';
import { Message } from '../enums/Message';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, StorageService]
})
export class AppComponent {

  messageService: MessageService = inject(MessageService);
  MessageEnum = Message;
  storageService: StorageService = inject(StorageService);
  companyName: string = 'румтибет';
  selectedLocation!: string;
  selectedDate!: string;
  selectedParticipants!: string;
  currentTimeAndDate: string = new Date().toString();
  counter: number = 0;
  currentWidget!: 'counter' | 'timeAndDate';
  liveText!: string;
  isLoading: boolean = true;

  offers: IOffer[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'icon-hike',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'icon-safety',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      img: 'icon-price',
    }
  ];

  locations: ILocation[] = [
    {
      id: 1,
      value: 'Altai',
      location: 'Алтай'
    },
    {
      id: 2,
      value: 'Dagestan',
      location: 'Дагестан'
    },
    {
      id: 3,
      value: 'Baikal',
      location: 'Байкал'
    },
    {
      id: 4,
      value: 'Kaliningrad',
      location: 'Калининград'
    }
  ];

  participants: IParticipant[] = [
    {
      id: 1,
      quantity: 4,
      value: 'four'
    },
    {
      id: 2,
      quantity: 6,
      value: 'six'
    },
    {
      id: 3,
      quantity: 8,
      value: 'eight'
    },
    {
      id: 4,
      quantity: 10,
      value: 'ten'
    },
  ];

  destinations: IDestination[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      price: 480,
      rating: '4.9',
      img: 'lake',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      price: 500,
      rating: '4.5',
      img: 'night-mountains',
    },
    {
      id: 3,
      title: 'Йога в горах',
      description: 'для тех, кто забоится о себе',
      price: 230,
      rating: '5.0',
      img: 'stretching',
    }
  ];

  articles: IArticle[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      decription: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      publication: '01/04/2023',
      img: 'italy'
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      decription: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      publication: '01/04/2023',
      img: 'plane'
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      decription: 'Для современного мира базовый вектор развития предполагает.',
      publication: '01/04/2023',
      img: 'woman'
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      decription: 'Для современного мира базовый.',
      publication: '01/04/2023',
      img: 'india'
    }
  ];

  constructor() {
    this.saveDateToLocalStorage();
    this.saveSessions();
    this.isPrimaryColor(Color.RED);
    this.showСurrentTimeAndDate();
    this.finishLoading();
  }

  showMessage(type: Message, text: string): void {
    this.messageService.addMessage(type, text);
  }

  closeMessage(message: any): void {
    this.messageService.closeMessage(message);
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  saveDateToLocalStorage(): void {
    this.storageService.saveToLocalStorage('date-last-entry', new Date());
  }

  saveSessions(): void {
    const visits: string | null = this.storageService.getFromLocalStorage('visit-counter');
    let visitCount: number;
    if (visits === null) {
      visitCount = 1;
    } else {
      visitCount = Number(visits) + 1;
    }
    this.storageService.saveToLocalStorage('visit-counter', visitCount.toString());
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

  finishLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

}
