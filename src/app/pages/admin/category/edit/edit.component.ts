import { Component } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { Category, typeResponseCategory } from '../../../../types/Category';
import { CategoryService } from '../../../../service/category.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgFor, NgIf, ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [MessageService],
})
export class UpdateCategoryComponent {
  userForm: FormGroup;

  categories: Category = { _id: '', name: '' };
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private naiv: Router
  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.categoryService
        .getOneCategory(id)
        .subscribe((data: typeResponseCategory) => {
          if (data.status === 0) {
            this.userForm.patchValue({
              name: data.data.name,
            });

            this.categories = data.data;
          }
        });
    }
    return;
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.categoryService
        .updateCategory({ ...formData, id: this.categories._id })
        .subscribe((data: any) => {
          if (data.status === 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update',
            });
            this.naiv.navigate(['/admin/listcategory']);
          }
        });
    }
  }
}
