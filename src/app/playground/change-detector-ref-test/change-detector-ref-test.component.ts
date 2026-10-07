import { Component, ChangeDetectionStrategy, inject, DoCheck, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-change-detector-ref-test',
  imports: [],
  templateUrl: './change-detector-ref-test.component.html',
  styleUrl: './change-detector-ref-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectorRefTestComponent implements DoCheck {

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  count: number = 0;

  ngDoCheck(): void {
    console.log('Change Detection (OnPush)');
  }

  changeCount(): void {
    setTimeout(() => {
      this.count = 5;
      this.cd.markForCheck();
    }, 1000);
  }

  changeCountDetectChanges(): void {
    setTimeout(() => {
      this.count = 10;
      this.cd.detectChanges();
    }, 1000);
  }

  detachComponent(): void {
    this.cd.detach();
  }

  changeCountClick(): void {
    this.count++;
    this.cd.markForCheck();
  }

  changeCountTimeout(): void {
    setTimeout(() => {
      this.count = 5;
      this.cd.markForCheck();
    }, 1000);
  }

  changeCountInterval(): void {
    setInterval(() => {
      this.count = 10;
      this.cd.markForCheck();
    }, 1000);
  }

  changeCountPromise(): void {
    Promise.resolve().then(() => {
      this.count = 20;
      this.cd.markForCheck();
    });
  }

  changeCountReattach(): void {
    this.cd.reattach();
  }

}
