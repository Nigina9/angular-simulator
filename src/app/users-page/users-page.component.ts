import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../../interfaces/IUser';
import { tap, BehaviorSubject, map, Observable, combineLatest } from 'rxjs';
import { UserCardComponent } from '../user-card/user-card.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { PluralPipe } from '../../pipes/plural.pipe';
import { BoldTextDirective } from '../../directives/bold-text.directive';
import { AnimatedGradientDirective } from '../../directives/animated-gradient.directive';

@Component({
  selector: 'app-users-page',
  imports: [
    AsyncPipe,
    UserCardComponent,
    CreateUserComponent,
    UsersFilterComponent,
    PluralPipe,
    BoldTextDirective,
    AnimatedGradientDirective,
  ],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {
  userService: UserService = inject(UserService);

  private filterSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>('');

  filteredUsers$: Observable<IUser[]> = combineLatest([
    this.userService.users$,
    this.filterSubject.asObservable(),
  ]).pipe(
    map(([users, query]: [IUser[], string | null]) =>
      users.filter((user: IUser) => user.name.toLowerCase().includes((query ?? '').toLowerCase())),
    ),
  );

  ngOnInit(): void {
    this.userService
      .loadUsers()
      .pipe(tap((users: IUser[]) => this.userService.setUsers(users)))
      .subscribe();
  }

  onDeleteUser(user: number): void {
    this.userService.onDeleteUser(user);
  }

  onCreateUser(user: IUser): void {
    this.userService.addNewUser(user);
  }

  onFilter(query: string | null): void {
    this.setFilter(query);
  }

  setFilter(query: string | null): void {
    this.filterSubject.next(query);
  }

  refreshUsers() {
    this.userService.refreshUsers().subscribe();
  }
}
