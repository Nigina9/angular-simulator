import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneFormatPipe } from '../../../shared/pipes/phone-format.pipe';
import { PhoneFormat } from '../../../shared/enums/Format';
import { BoldTextDirective } from '../../../shared/directives/bold-text.directive';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneFormatPipe, BoldTextDirective, TranslatePipe],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>();

  languageService: LanguageService = inject(LanguageService);

  phoneFormat: typeof PhoneFormat = PhoneFormat;

  onDelete(): void {
    this.deleteUser.emit(this.user.id);
  }

}
