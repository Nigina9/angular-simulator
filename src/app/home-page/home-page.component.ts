import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../../interfaces/ILocation';
import { IParticipant } from '../../interfaces/IParticipant';
import { IDestination } from '../../interfaces/IDestination';
import { IOffer } from '../../interfaces/IOffer';
import { IArticle } from '../../interfaces/IArticle';
import { IReport } from '../../interfaces/IReport';
import { MessageService } from '../../service/message.service';
import { inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPersonHiking, faBuildingShield, faTags, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, FontAwesomeModule, TranslatePipe, DatePickerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  messageService: MessageService = inject(MessageService);
  languageService: LanguageService = inject(LanguageService);
  selectedLocation: string = '';
  selectedDate: Date | null = null;
  selectedParticipants: string = '';
  liveText!: string;
  faPersonHiking: IconDefinition = faPersonHiking;
  faBuildingShield: IconDefinition = faBuildingShield;
  faTags: IconDefinition = faTags;

  locations: ILocation[] = [
    {
      id: 1,
      value: 'Altai',
      location: 'LOCATION.ALTAI'
    },
    {
      id: 2,
      value: 'Dagestan',
      location: 'LOCATION.DAGESTAN'
    },
    {
      id: 3,
      value: 'Baikal',
      location: 'LOCATION.BAIKAL'
    },
    {
      id: 4,
      value: 'Kaliningrad',
      location: 'LOCATION.KALININGRAD'
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
    }
  ];

  destinations: IDestination[] = [
    {
      id: 1,
      title: 'HOME.POPULAR_TOURS.DESTINATIONS.LAKE.TITLE',
      description: 'HOME.POPULAR_TOURS.DESTINATIONS.LAKE.DESCRIPTION',
      price: 480,
      rating: '4.9',
      img: 'lake'
    },
    {
      id: 2,
      title: 'HOME.POPULAR_TOURS.DESTINATIONS.NIGHT.TITLE',
      description: 'HOME.POPULAR_TOURS.DESTINATIONS.NIGHT.DESCRIPTION',
      price: 500,
      rating: '4.5',
      img: 'night-mountains'
    },
    {
      id: 3,
      title: 'HOME.POPULAR_TOURS.DESTINATIONS.YOGA.TITLE',
      description: 'HOME.POPULAR_TOURS.DESTINATIONS.YOGA.DESCRIPTION',
      price: 230,
      rating: '5.0',
      img: 'stretching'
    }
  ];

  offers: IOffer[] = [
    {
      id: 1,
      title: 'HOME.ADVANTAGES.OFFERS.GUIDE',
      description:'HOME.ADVANTAGES.OFFERS.DESCRIPTION',
      img: faPersonHiking
    },
    {
      id: 2,
      title: 'HOME.ADVANTAGES.OFFERS.HIKE',
      description:'HOME.ADVANTAGES.OFFERS.DESCRIPTION',
      img: faBuildingShield
    },
    {
      id: 3,
      title: 'HOME.ADVANTAGES.OFFERS.PRICE',
      description:'HOME.ADVANTAGES.OFFERS.DESCRIPTION',
      img: faTags
    }
  ];

  articles: IArticle[] = [
    {
      id: 1,
      title: 'HOME.ARTICLES.ITALY.TITLE',
      decription: 'HOME.ARTICLES.ITALY.DESCRIPTION',
      publication: '01/04/2023',
      img: 'italy'
    },
    {
      id: 2,
      title: 'HOME.ARTICLES.DOUBTS.TITLE',
      decription: 'HOME.ARTICLES.DOUBTS.DESCRIPTION',
      publication: '01/04/2023',
      img: 'plane'
    },
    {
      id: 3,
      title: 'HOME.ARTICLES.ALONE.TITLE',
      decription: 'HOME.ARTICLES.ALONE.DESCRIPTION',
      publication: '01/04/2023',
      img: 'woman'
    },
    {
      id: 4,
      title: 'HOME.ARTICLES.INDIA.TITLE',
      decription: 'HOME.ARTICLES.INDIA.DESCRIPTION',
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

}
