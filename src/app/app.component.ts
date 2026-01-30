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
    if (color === Color.RED || color === Color.GREEN || color === Color.BLUE) {
      return true;
    }
    return false;
  }

  saveDataLocalStorage(): void {
    let dataEntry = new Date();
    localStorage.setItem('date-last-entry', dataEntry.toString());
  }

  savesSessions(): void {
    const visits = localStorage.getItem('visit-counter');
    let visitCount: number;
    if (visits === null) {
      visitCount = 1;
    } else {
      visitCount = Number(visits) + 1;
    }
    localStorage.setItem('visit-counter', visitCount.toString());
  }

  constructor() {
    this.saveDataLocalStorage();
    this.savesSessions();
    this.isPrimaryColor(Color.RED);
  }
}
