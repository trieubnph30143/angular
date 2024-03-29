import { UpdateCategoryComponent } from './pages/admin/category/edit/edit.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductComponent } from './pages/admin/products/product/product.component';
import { CreateComponent } from './pages/admin/products/create/create.component';
import { UpdateComponent } from './pages/admin/products/edit/edit.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AddCategoryComponent } from './pages/admin/category/create/create.component';
import { UserListComponent } from './pages/admin/users/list/list.component';
import { UserCreateComponent } from './pages/admin/users/create/create.component';
import { CategorylistComponent } from './pages/admin/category/categorylist/categorylist.component';

export const routes: Routes = [
  // route '/' = page Home
  // path, component
  { path: '', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },

  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: ProductComponent },
      { path: 'product/create', component: CreateComponent },
      { path: 'product/:id', component: UpdateComponent },
      { path: 'listcategory', component: CategorylistComponent },
      { path: 'category/create', component: AddCategoryComponent },
      { path: 'category/:id', component: UpdateCategoryComponent },

      { path: 'user/list', component: UserListComponent },
      { path: 'user/create', component: UserCreateComponent },
    ],
  },
];
