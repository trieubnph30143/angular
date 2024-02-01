import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MessageService } from 'primeng/api';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../../service/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  providers: [MessageService],
})
export class UserCreateComponent {
  userForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      if (formData.password === formData.confirmpassword) {
        this.authService
          .SignUp({ email: formData.email, password: formData.password })
          .subscribe((data: any) => {
            if (data.status === 0) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Message Content',
              });
              this.userForm.reset();
              setTimeout(() => {
                this.router.navigate(['/admin/user/list']);
              }, 1000);
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: data.message,
              });
            }
          });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'mat khau khong trung khop',
        });
      }
    }
  }
}
