import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

import { ProductComponent } from './pages/admin/product/product.component';

export const routes: Routes = [
  // route '/' = page Home
  // path, component
  { path: '', component: HomeComponent },
  { path: 'admin', component: ProductComponent },
];
