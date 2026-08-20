import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, IconDefinition, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { applicationConfiguration } from '../configuration.token';
import { IApplicationConfiguration } from '../../interfaces/IApplicationConfiguration';
import { LanguageService } from '../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  configuration: IApplicationConfiguration = inject(applicationConfiguration);
  languageService: LanguageService = inject(LanguageService);

  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
