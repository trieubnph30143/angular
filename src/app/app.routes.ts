import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './layouts/admin/admin.component';
import { ProductsComponent } from './pages/admin/product/product.component';
import { CreateComponent } from './pages/admin/create/create.component';
import { UpdateComponent } from './pages/admin/edit/edit.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

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
      { path: 'products', component: ProductsComponent },
      { path: 'product/create', component: CreateComponent },
      { path: 'product/:id', component: UpdateComponent },
    ],
  },
];
