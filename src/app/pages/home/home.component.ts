import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core'; // khai bao inject
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

import { ProductService } from '../../service/product.service';
import { ProductCartComponent } from '../../components/product-cart/product-cart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, ProductCartComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  productService = inject(ProductService); // inject vao bien

  productList: any = [];

  ngOnInit(): void {
    this.productService
      .getProductList()
      .subscribe((products: any) => (this.productList = products)); // callApi.then(cb fuc)
  }
  //contruct
}
