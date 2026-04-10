import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {

  @Input() user!: IUser;
  @Output() deleteUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  onDeleteUser(): void {
    this.deleteUser.emit(this.user);
  }

}

