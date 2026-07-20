import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTelegram, IconDefinition, faVk, faPinterest, faSkype } from '@fortawesome/free-brands-svg-icons';
import { applicationConfiguration } from '../configuration.token';
import { IApplicationConfiguration } from '../../interfaces/IApplicationConfiguration';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  configuration: IApplicationConfiguration = inject(applicationConfiguration);

  faTelegram: IconDefinition = faTelegram;
  faVk: IconDefinition = faVk;
  faPinterest: IconDefinition = faPinterest;
  faSkype: IconDefinition = faSkype;

}
