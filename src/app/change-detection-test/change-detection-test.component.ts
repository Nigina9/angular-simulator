import { Component, ChangeDetectionStrategy, DoCheck, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-detection-test',
  imports: [],
  templateUrl: './change-detection-test.component.html',
  styleUrl: './change-detection-test.component.scss',
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChangeDetectionTestComponent implements DoCheck {

  private http: HttpClient = inject(HttpClient);

  count: number = 0;

  ngDoCheck(): void {
    console.log('Change Detection');
  }

  changeCount(): void {
    this.count = 5;
  }

  changeCountTimeout(): void {
    setTimeout(() => {
      this.count = 10;
    }, 1000);
  }

  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count = 15;
    });
  }

  changeCountHttp(): void {
      this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(() => {
      this.count = 20;
    });
  }

  changeCountSetInterval(): void {
    setInterval(() => {
      this.count++;
    }, 1000);
  }

  changeCountComboMethods(): void {
    this.count = 100;

    Promise.resolve().then(() => {
      this.count = 200;
    });

    setTimeout(() => {
        this.count = 300;
    }, 1000);
    }

}
