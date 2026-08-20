import { Component, inject, OnInit, Output, DestroyRef } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LanguageService } from '../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-users-filter',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './users-filter.component.html',
  styleUrl: './users-filter.component.scss'
})
export class UsersFilterComponent implements OnInit {

  @Output() filterUsers: EventEmitter<string | null> = new EventEmitter<string | null>();

  languageService: LanguageService = inject(LanguageService);

  filterControl: FormControl<string | null> = new FormControl<string | null>('');
  destroyRef: DestroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((value: string | null) => this.filterUsers.emit(value)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

}
