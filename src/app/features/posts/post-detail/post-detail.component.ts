import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../IPost';
import { LanguageService } from '../../../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-post-detail',
  imports: [TranslatePipe],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss'
})
export class PostDetailComponent {

  private route: ActivatedRoute = inject(ActivatedRoute);
  languageService: LanguageService = inject(LanguageService);

  post: IPost = this.route.snapshot.data['post'];

}
