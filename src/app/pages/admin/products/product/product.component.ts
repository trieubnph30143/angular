import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CategoryService } from '../../../../service/category.service';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ScrollerModule } from 'primeng/scroller';
import { ProductService } from '../../../../service/product.service';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgFor,
    ToastModule,
    ConfirmDialogModule,
    ButtonModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    MultiSelectModule,
    ScrollerModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProductComponent implements DoCheck {
  productList: any = [];
  userForm: FormGroup;
  first1: number = 0;
  count: number = 0;
  searchTerm: string = '';
  rows1: number = 4;
  previousSearchTerm: string = '';
  checkData: boolean = false;
  cities!: any[];
  selectedCities!: any[];
  form = new FormGroup({
    selectedCities: new FormControl([]),
  });

  searchControl = new FormControl();
  serachDebouce: any = [];
  modalSearchDebouce: boolean = false;
  loading = false;
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      search: [''],
    });
    // this.searchControl.valueChanges
    //   .pipe(
    //     debounceTime(500),
    //     distinctUntilChanged(),
    //     switchMap((term) => this.searchGetCall(term))
    //   )
    //   .subscribe((results) => {
    //     if (results.status === 1) {
    //       this.serachDebouce = [];
    //       this.loading = false;
    //     } else {
    //       this.loading = false;
    //       this.serachDebouce = results.data;
    //     }
    //   });
  }

  // onInputFocus() {
  //   this.loading = true;
  //   this.modalSearchDebouce = true;
  //   this.productService
  //     .getProduct({ page: 0, size: 10 })
  //     .subscribe((product: any) => {
  //       this.serachDebouce = product.data;
  //       this.loading = false;
  //     });
  //   return true;
  // }
  // onInputBlur() {
  //   this.modalSearchDebouce = false;
  //   return (this.serachDebouce = []);
  // }
  // searchGetCall(term: string) {
  //   this.loading = true;
  //   if (term === '') {
  //     this.productService
  //       .getProduct({ page: 0, size: 10 })
  //       .subscribe((product: any) => {
  //         return (this.serachDebouce = product.data);
  //       });
  //     // return of([]);
  //   }

  //   return this.productService.getSearchDebouceProduct({ search: term }).pipe(
  //     catchError((error) => {
  //       console.error('Error:', error);
  //       return throwError(error);
  //     })
  //   );
  // }
  onPageChange1(event: any) {
    this.first1 = event.first;
    this.rows1 = event.rows;
    const id = this.route.snapshot.queryParamMap.get('id');
    const search = this.route.snapshot.params['search'];
    const selectedCities: any = this.form.value.selectedCities;

    if (id) {
      this.productService
        .getCategoryProduct({ id: id, page: event.first, size: 4 })
        .subscribe((product: any) => {
          this.count = product.count;
          return (this.productList = product.data);
        });
    } else if (search) {
      this.productService
        .getSearchProduct({
          search: search,
          page: event.first,
          size: 2,
        })
        .subscribe((data) => {
          this.count = data.count;
          this.checkData = true;
          return (this.productList = data.data);
        });
    } else if (selectedCities[0]) {
      this.productService
        .getFilterProduct({
          page: event.first,
          size: 2,
          id: selectedCities?.map((item: any) => item.code),
        })
        .subscribe((data) => {
          console.log(data.count);
          this.count = data.count;
          return (this.productList = data.data);
        });
    } else {
      this.productService
        .getProduct({ page: event.first, size: 4 })
        .subscribe((product: any) => {
          this.count = product.count;
          return (this.productList = product.data);
        });
    }
  }
  addProduct() {
    return this.router.navigate(['/admin/product/create']);
  }
  getAll(check?: any) {
    const id = this.route.snapshot.queryParamMap.get('id');

    if (id) {
      this.productService
        .getCategoryProduct({ id: id, page: this.first1, size: 4 })
        .subscribe((product: any) => {
          this.count = product.count;
          this.form = new FormGroup({
            selectedCities: new FormControl<any>([
              { name: product.data[0].categoryId.name, code: id },
            ]),
          });

          return (this.productList = product.data);
        });
    } else {
      this.productService
        .getProduct({ page: check ? check : this.first1, size: 4 })
        .subscribe((product: any) => {
          this.count = product.count;

          return (this.productList = product.data);
        });
    }
  }
  onSelectChange(event: any) {
    const selectedCities: any = this.form.value.selectedCities;
    if (selectedCities[0]) {
      this.productService
        .getFilterProduct({
          page: this.first1,
          size: 4,
          id: selectedCities?.map((item: any) => item.code),
        })
        .subscribe((data) => {
          console.log(data.count);
          this.count = data.count;
          return (this.productList = data.data);
        });
    } else {
      this.productService
        .getProduct({ page: 0, size: 4 })
        .subscribe((product: any) => {
          this.count = product.count;
          return (this.productList = product.data);
        });
    }
  }
  ngOnInit(): void {
    this.getAll();
    this.categoryService.getCategory().subscribe((data) => {
      this.cities = data.data.map((item: any) => {
        return { name: item.name, code: item._id };
      });
    });
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
            if (data.count % this.rows1 === 0) {
              this.getAll(this.first1 - 1);
            } else {
              this.getAll();
            }
          }
        });
      },
    });
  }
  updateProduct(id: string) {
    return this.router.navigate([`/admin/product/${id}`]);
  }
  ngDoCheck() {
    if (this.searchTerm !== this.previousSearchTerm) {
      const search = this.route.snapshot.params['search'];
      if (search) {
        this.productService
          .getSearchProduct({
            search: search,
            page: this.first1,
            size: 4,
          })
          .subscribe((data) => {
            if (data.status === 1) {
              this.router.navigate(['/admin/products']);
              return this.messageService.add({
                severity: 'warn',

                detail: `Không có dữ liệu với từ khóa : ${search}`,
              });
            }
            this.count = data.count;
            this.checkData = true;
            return (this.productList = data.data);
          });
      }
    }
  }
  onSubmit() {
    this.router.navigate([
      '/admin/products',
      { search: this.userForm.value.search },
    ]);
    this.searchTerm = this.userForm.value.search;
    this.userForm.reset();
    this.first1 = 0;
    setTimeout(() => {
      this.searchTerm = '';
    });
  }
  comeBack() {
    this.checkData = false;
    const selectedCities: any = this.form.value.selectedCities;
    if (selectedCities[0]) {
      this.productService
        .getFilterProduct({
          page: 0,
          size: 4,
          id: selectedCities?.map((item: any) => item.code),
        })
        .subscribe((data) => {
          this.count = data.count;
          return (this.productList = data.data);
        });
      this.first1 = 0;
    } else {
      this.getAll();
    }
    this.router.navigate(['/admin/products']);
  }
}
