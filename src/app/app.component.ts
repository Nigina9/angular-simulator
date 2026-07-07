import { Component, inject, OnInit } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../service/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from './loader/loader.component';
@Component({
  selector: 'app-root',
  imports: [FormsModule, MessageComponent, LoaderComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent implements OnInit {
  localStorageService: LocalStorageService = inject(LocalStorageService);

  ngOnInit(): void {
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
