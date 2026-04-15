import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  // @Output() onDeleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() onDeleteUser: EventEmitter<number> = new EventEmitter<number>();

  onDelete(): void {
    this.onDeleteUser.emit(this.user.id);
  }

}

