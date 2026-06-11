import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  postService: PostService = inject(PostService);

  createForm: FormGroup = this.fb.group({
    id: [Date.now()],
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    body: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    tags: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    reactions: this.fb.group({
      likes: ['', [Validators.required, Validators.min(0)]],
      dislikes: ['', [Validators.required, Validators.min(0)]],
    }),
    views: ['', [Validators.required, Validators.min(0)]],
    userId: ['', [Validators.required, Validators.min(0)]],
  })

  onSavePost(): void {
    if(this.createForm.valid) {
      this.createForm.patchValue({ id: Date.now() });
      this.postService.createPost(this.createForm.value).subscribe(() => {
        this.router.navigate(['/posts']);
      })
    }
  }

}
