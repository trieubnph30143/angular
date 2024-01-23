import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ProductAdmin } from '../../../../types/Product';
import { ProductService } from '../../../../service/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, ToastModule, ConfirmDialogModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProductsComponent {
  productList: any = [];
  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  addProduct() {
    return this.router.navigate(['/admin/product/create']);
  }
  getAll() {
    this.productService.getProduct().subscribe((product: any) => {
      return (this.productList = product.data);
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
  deleteProduct(id: string) {
    this.confirmationService.confirm({
      accept: () => {
        return this.productService.deleteProduct(id).subscribe((data: any) => {
          if (data.status === 0) {
            this.messageService.add({
              severity: 'success',

              detail: 'Delete Success',
            });
            this.getAll();
          }
        });
      },
    });
  }
  updateProduct(id: string) {
    return this.router.navigate([`/admin/product/${id}`]);
  }
}
