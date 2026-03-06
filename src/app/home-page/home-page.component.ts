import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../../interfaces/ILocation';
import { IParticipant } from '../../interfaces/IParticipant';
import { IDestination } from '../../interfaces/IDestination';
import { IOffer } from '../../interfaces/IOffer';
import { IArticle } from '../../interfaces/IArticle';
import { IReport } from '../../interfaces/IReport';
import { MessageService } from '../../message.service';
import { inject } from '@angular/core';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  selectedLocation: string = '';
  selectedDate: string = '';
  selectedParticipants: string = '';
  liveText!: string;

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

  images: IReport[] = [
    {
      id: 1,
      image: 'photographer'
    },
    {
      id: 2,
      image: 'map'
    },
    {
      id: 3,
      image: 'dubai'
    },
    {
      id: 4,
      image: 'sea'
    },
    {
      id: 5,
      image: 'canyon'
    },
    {
      id: 6,
      image: 'notepad'
    }
  ];

  constructor() {
    this.saveDateToLocalStorage();
    this.saveSessions();
  }

  saveDateToLocalStorage(): void {
    this.localStorageService.saveValue('date-last-entry', new Date());
  }

  saveSessions(): void {
    const visits: string | null = this.localStorageService.getValue('visit-counter');
    let visitCount: number;
    if (visits === null) {
      visitCount = 1;
    } else {
      visitCount = Number(visits) + 1;
    }
    this.localStorageService.saveValue('visit-counter', visitCount.toString());
  }

}
