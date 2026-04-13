import { Component, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormControl} from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { tap } from 'rxjs';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit{

  @Output() filterString: EventEmitter<string | null> = new EventEmitter<string | null>();
  usersFilterField: FormControl<string | null> = new FormControl<string | null>('');

  ngOnInit(): void {
    this.usersFilterField.valueChanges
      .pipe(
        tap(value => this.filterString.emit(value))
      ).subscribe();
  }

}
