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
import { LanguageService } from '../../../service/language.service';
import { TranslatePipe } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DestroyRef } from '@angular/core';

@Component({
  selector: 'app-posts',
  imports: [TableModule, SkeletonModule, ContextMenuModule, RouterLink, RouterModule, RouterOutlet, AsyncPipe, TranslatePipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  providers: [DialogService]
})
export class PostsComponent implements OnInit {

  private router: Router = inject(Router);
  private dialogService: DialogService = inject(DialogService);
  private ref: DynamicDialogRef | undefined | null = undefined;
  private destroyRef: DestroyRef = inject(DestroyRef);
  postService: PostService = inject(PostService);
  languageService: LanguageService = inject(LanguageService);
  translateService: TranslateService = inject(TranslateService);

  posts: IPost[] = [];
  skeletonRows: unknown[] = Array.from({ length: 10 });
  isLoading: boolean = true;
  rows: number = 10;
  first: number = 0;
  totalRecords: number = 0;
  selectedPost: IPost | null = null;
  postsContextMenu: MenuItem[] = [];

  ngOnInit(): void {
    this.buildContextMenu();

    this.translateService.onLangChange.pipe(
        tap(() => this.buildContextMenu()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
    this.loadPosts();
  }

  private buildContextMenu(): void {
    this.postsContextMenu = [
      {
        label: this.translateService.instant('POSTS_PAGE.CONTEXT_MENU.VIEW'),
        icon: 'pi pi-fw pi-search',
        command: () => this.navigateToPost(this.selectedPost)
      },
      {
        label: this.translateService.instant('POSTS_PAGE.CONTEXT_MENU.EDIT'),
        icon: 'pi pi-fw pi-wrench',
        command: () => this.openEditDialog()
      },
      {
        label: this.translateService.instant('POSTS_PAGE.CONTEXT_MENU.DELETE'),
        icon: 'pi pi-fw pi-eye',
        command: () => this.deletePost(this.selectedPost!.id)
      }
    ];
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
