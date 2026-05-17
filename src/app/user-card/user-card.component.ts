import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { FormatNumberPipe } from '../../pipes/format-number.pipe';
import { Format } from '../../enums/Format';
import { BoldTextDirective } from '../../directives/bold-text.directive';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, FormatNumberPipe, BoldTextDirective],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  formatMode: typeof Format = Format;

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}

