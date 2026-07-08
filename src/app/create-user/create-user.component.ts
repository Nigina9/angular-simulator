import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { BoldTextDirective } from '../../directives/bold-text.directive';
import { AnimatedGradientDirective } from '../../directives/animated-gradient.directive';
import { IGradientConfiguration } from '../../interfaces/IGradientConfiguration';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, ReactiveFormsModule, BoldTextDirective, AnimatedGradientDirective],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private fb: FormBuilder = inject(FormBuilder);
  gradientConfig: IGradientConfiguration = {
    delay: 500,
    colors: ['#d4a373', '#1a3e3e'],
    thickness: 3
  };

  registrationForm: FormGroup = this.fb.group({
    id: [Date.now()],
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.fb.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.fb.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      })
    }),
    company: this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)]
    })
  });

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.registrationForm.patchValue({ id: Date.now() });
      this.createUser.emit(this.registrationForm.value);
    }
  }

}
