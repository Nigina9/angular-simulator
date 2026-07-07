import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../../pipes/phone-format.pipe';
import { PhoneFormat } from '../../enums/Format';
import { BoldTextDirective } from '../../directives/bold-text.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneFormatPipe, BoldTextDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }
}
