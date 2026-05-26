import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appBoldText]',
})
export class BoldTextDirective {

  @HostBinding('style.fontWeight') fontWeight: string = 'normal';

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.fontWeight = 'normal';
  }
}
