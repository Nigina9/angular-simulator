import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { IPost } from './IPost';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { PostEditDialogComponent } from './post-edit-dialog/post-edit-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostService } from './post.service';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, RouterLink, RouterModule, RouterOutlet],
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
  skeletonRows = Array.from({ length: 10 });
  loading: boolean = true;
  rows: number = 10;
  first: number = 0;
  totalRecords: number = 0;
  selectedPost: IPost | null = null;

  items: MenuItem[] = [
    {
      label: 'Посмотреть пост',
      icon: 'pi pi-fw pi-search',
      command: () => this.onTableDLClick(this.selectedPost)
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

  ngOnInit() {
    this.subscribeToData();
    this.loadPosts();
  }

  loadPosts() {
    this.loading = true;
    this.postService.loadPosts(this.rows, this.first);
  }

  subscribeToData() {
    this.postService.post$.subscribe((posts: IPost[]) => {
      this.posts = posts;
      this.loading = false;
    });
    this.postService.total$.subscribe((total: number) => {
      this.totalRecords = total;
    });
  }

  onTableDLClick(post: IPost | null): void {
    if (!post) return;
    this.router.navigate(['/posts', post.id]);
 }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.postService.loadPosts(this.rows, this.first);
  }

  openEditDialog() {
    const postToEdit = this.selectedPost;
    this.ref = this.dialogService.open(PostEditDialogComponent,{ data: { post:  postToEdit }});
    this.ref!.onClose.subscribe(formData => {
      if(formData && postToEdit) {
        this.postService.updatePost(postToEdit.id, formData)
      }
    });
  }

  deletePost(id: number) {
    this.postService.onDeletePost(id);
  }

}

