import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { catchError, tap, of } from 'rxjs';
import { MessageService } from '../../../../service/message.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private authService: AuthService= inject(AuthService);
  private messageService: MessageService = inject(MessageService);

  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  })

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).pipe(
        tap(() => {
          this.router.navigate(['']);
          this.messageService.showSuccess("Вы авторизованы");
        }),
        catchError(() => {
          this.messageService.showError('Ошибка доступа');
          return of(null);
        })
      ).subscribe();
    }
  }

}


