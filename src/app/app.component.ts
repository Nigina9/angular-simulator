import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../service/message.service';
import { LocalStorageService } from '../service/local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, FooterComponent, HeaderComponent, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: []
})
export class AppComponent {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.isPrimaryColor(Color.RED);
    this.saveDateToLocalStorage();
    this.saveSessions();
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
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
