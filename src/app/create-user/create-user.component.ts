import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';

@Component({
  selector: 'app-create-user',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {

  @Output() newUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  private formBulding = inject(FormBuilder);
  private unknownValue: string = 'Неизвестно';

  registrationForm: FormGroup = this.formBulding.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(25)]],
    website: ['', [Validators.maxLength(100)]],
    address: this.formBulding.group({
      city: ['', [Validators.required, Validators.maxLength(50)]],
      street: ['', [Validators.required, Validators.maxLength(100)]],
      suite: ['', [Validators.maxLength(50)]],
      zipcode: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      geo: this.formBulding.group({
        lat: ['', [Validators.required]],
        lng: ['', [Validators.required]]
      })
    }),
    company: this.formBulding.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      catchPhrase: ['', Validators.maxLength(200)],
      bs: ['', Validators.maxLength(100)]
    })
  })

  onSubmit(): void {
    if (this.registrationForm.valid) {
      if (!this.registrationForm.value.website) {
        this.registrationForm.patchValue({
          website: this.unknownValue
        })
      }
      if (!this.registrationForm.value.address.suite) {
        this.registrationForm.patchValue({
          address: { suite: this.unknownValue }
        })
      }
      if (!this.registrationForm.value.company.catchPhrase) {
        this.registrationForm.patchValue({
          company: { catchPhrase: this.unknownValue }
        })
      }
      if (!this.registrationForm.value.company.bs) {
        this.registrationForm.patchValue({
          company: { bs: this.unknownValue }
        })
      }
      this.newUser.emit(this.registrationForm.value);
    }
  }

}
