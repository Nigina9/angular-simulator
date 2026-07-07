import { Component, inject, OnInit, Output, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss',
})
export class UsersFilterComponent implements OnInit {
  @Output() filterUsers: EventEmitter<string | null> = new EventEmitter<string | null>();
  filterControl: FormControl<string | null> = new FormControl<string | null>('');
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((value: string | null) => this.filterUsers.emit(value)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }
}
