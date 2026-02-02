import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import './collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  companyName: string = 'румтибет';

  isPrimaryColor(color: Color): boolean {
    return [Color.RED, Color.GREEN, Color.BLUE].includes(color);
  }

  saveDateToLocalStorage(): void {
    localStorage.setItem('date-last-entry', new Date().toString())
  }

  saveSessions(): void {
    const visits: string | null = localStorage.getItem('visit-counter');
    let visitCount: number;
    if (visits === null) {
      visitCount = 1;
    } else {
      visitCount = Number(visits) + 1;
    }
    localStorage.setItem('visit-counter', visitCount.toString());
  }

  constructor() {
    this.saveDateToLocalStorage();
    this.saveSessions();
    this.isPrimaryColor(Color.RED);
  }
  
}
