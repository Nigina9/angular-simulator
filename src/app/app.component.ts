import { Component, inject } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { MessageService } from '../message.service';
import { LocalStorageService } from '../local-storage.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
@Component({
  selector: 'app-root',
  imports: [FormsModule, FooterComponent, HeaderComponent, RouterOutlet, MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService, LocalStorageService]
})
export class AppComponent {

  isLoading: boolean = true;

  constructor() {
    this.isPrimaryColor(Color.RED);
    this.finishLoading();
  }

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  finishLoading(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

}
