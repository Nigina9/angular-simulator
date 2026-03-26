import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { UserService } from '../../service/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [LoaderComponent, AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {

  userService: UserService = inject(UserService);
  constructor() {
    this.userService.loadUsers();
  }
  
}
