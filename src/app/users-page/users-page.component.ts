import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { tap } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from "../create-user/create-user.component";

@Component({
  selector: 'app-users-page',
  imports: [AsyncPipe, UserCardComponent, CreateUserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  userService: UserService = inject(UserService);

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }

  onCreateUser(user: IUser): void {
    this.userService.addNewUser(user);
  }

  refreshUsers(): void {
    this.userService.refreshUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users)),
      ).subscribe();
  }

}
