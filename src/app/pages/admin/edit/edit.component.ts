import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastModule } from 'primeng/toast';

import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/categorys.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, ToastModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [MessageService],
})
export class UpdateComponent {
  userForm: FormGroup;
  dataupdate = {
    _id: '',
    title: '',
    price: 0,
    description: '',
    categoryId: '',
    image: '',
  };
  categories: any = [];
  constructor(
    private productService: ProductService,

    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private naiv: Router
  ) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      image: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategory().subscribe((data: any) => {
      this.categories = data.data;
    });
    if (id) {
      return this.productService.getOneProduct(id).subscribe((data) => {
        if (data.status === 0) {
          this.userForm.patchValue({
            title: data.data.title,
            description: data.data.description,
            price: data.data.price,
            image: data.data.image,
            categoryId: data.data.categoryId._id,
          });
          this.dataupdate = data.data;
        }
      });
    }
    return;
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      this.productService
        .updateProduct({ ...formData, id: this.dataupdate._id })
        .subscribe((data: any) => {
          if (data.status === 0) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Update',
            });
            this.naiv.navigate(['/admin/products']);
          }
        });
    }
  }
}
