import { Directive, ElementRef, Input, Renderer2, HostListener, inject } from '@angular/core';
import { IGradientConfiguration } from '../interfaces/IGradientConfiguration';

@Directive({
  selector: '[appAnimatedGradient]'
})
export class AnimatedGradientDirective {

  @Input() gradientConfiguration: IGradientConfiguration = {};

  private el: ElementRef = inject(ElementRef);
  private render: Renderer2 = inject(Renderer2);
  private timerId!: number;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.timerId = setTimeout(() => {
      this.render.setStyle(this.el.nativeElement, 'transition', 'border 0.3s ease');
      this.render.setStyle(this.el.nativeElement, 'border', `${ this.gradientConfiguration.thickness || 2 }px solid`);
      const colors: string = this.gradientConfiguration.colors?.join(', ') || 'pink, purple';
      this.render.setStyle(this.el.nativeElement, 'border-image', `linear-gradient(${ colors }) 1`);
    }, this.gradientConfiguration.delay || 1000);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    clearTimeout(this.timerId);
    this.render.removeStyle(this.el.nativeElement, 'border');
    this.render.removeStyle(this.el.nativeElement, 'border-image');
  }

}
