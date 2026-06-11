import { Component, inject, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule, DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IPost } from '../IPost';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-post-edit-dialog',
  imports: [DialogModule, DynamicDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './post-edit-dialog.component.html',
  styleUrl: './post-edit-dialog.component.scss',
})
export class PostEditDialogComponent implements OnInit {

  private config: DynamicDialogConfig = inject(DynamicDialogConfig);
  private fb: FormBuilder = inject(FormBuilder);
  messageService: MessageService = inject(MessageService);

  post: IPost = this.config.data.post;

  ref: DynamicDialogRef = inject(DynamicDialogRef);

  editForm: FormGroup = this.fb.group({
    title: ['', [Validators.minLength(5)]],
    tags: ['', [Validators.minLength(5)]],
    views: ['', [Validators.required]]
  });

  ngOnInit(): void {
    this.editForm.patchValue({
      title: this.post.title,
      tags: this.post.tags,
      views: this.post.views
    });
  }

  onClose(): void {
    this.ref.close();
    this.messageService.showSuccess('Отмена сохранения данных');
  }

  onSave(): void {
    this.ref.close(this.editForm.value);
  }

}
