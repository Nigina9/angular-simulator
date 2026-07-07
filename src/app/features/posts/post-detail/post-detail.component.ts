import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../IPost';

@Component({
  selector: 'app-post-detail',
  imports: [],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  post: IPost = this.route.snapshot.data['post'];
}
