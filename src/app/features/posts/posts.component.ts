import { Component, OnInit, inject } from '@angular/core';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { IPost } from './IPost';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostService } from './post.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { tap } from 'rxjs';
@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, RouterLink, RouterModule, RouterOutlet, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService]
})
export class PostsComponent implements OnInit {

  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private ref: DynamicDialogRef | undefined | null = undefined;
  postService: PostService = inject(PostService);

  posts: IPost[] = [];
  skeletonRows: unknown[] = Array.from({ length: 10 });
  isLoading: boolean = true;
  rows: number = 10;
  first: number = 0;
  totalRecords: number = 0;
  selectedPost: IPost | null = null;

  postsContextMenu: MenuItem[] = [
    {
      label: 'Посмотреть пост',
      icon: 'pi pi-fw pi-search',
      command: () => this.navigateToPost(this.selectedPost)
    },
    {
      label: 'Редактировать пост',
      icon: 'pi pi-fw pi-wrench',
      command: () => this.openEditDialog()
    },
    {
      label: 'Удалить пост',
      icon: 'pi pi-fw pi-eye',
      command: () => this.deletePost(this.selectedPost!.id)
    }
  ];

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.loadPosts(this.rows, this.first);
  }

  navigateToPost(post: IPost | null): void {
    if (!post) return;
    this.router.navigate(['/posts', post.id]);
  }

  onPageChange(event: TableLazyLoadEvent): void {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.postService.loadPosts(this.rows, this.first);
  }

  openEditDialog(): void {
    const postToEdit: IPost | null = this.selectedPost;
    this.ref = this.dialogService.open(PostEditDialogComponent, { data: { post: postToEdit } });
    this.ref!.onClose.pipe(
      tap((formData: Partial<IPost>) => {
        if (formData && postToEdit) {
          this.postService.updatePost(postToEdit.id, formData);
        }
      })
    ).subscribe();
  }

  deletePost(id: number): void {
    this.postService.onDeletePost(id);
  }

}
