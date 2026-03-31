import { Component, inject } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);

  constructor() {
    this.userService.loadUsers()
     .pipe(
       tap((users: IUser[]) => this.userService.setUsers(users)),
     ).subscribe();
  }

}
