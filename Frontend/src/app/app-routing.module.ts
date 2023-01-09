import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { ProductListPageComponent } from './components/product-list-page/product-list-page.component';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'products',
    component: ProductListPageComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'products/:page',
    component: ProductListPageComponent,
    canActivate: [IsLoggedInGuard],
  },
  {
    path: 'product/:code',
    component: ProductDetailPageComponent,
    canActivate: [IsLoggedInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
