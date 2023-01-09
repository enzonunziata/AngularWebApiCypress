import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { UserLogin } from '../../models/user-login.model';
import { UserService } from '../../services/user.service';
import { LoginComponent } from '../login/login.component';
import { ProductListPageComponent } from '../product-list-page/product-list-page.component';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let userService: UserService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPageComponent, LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
          { path: 'products', component: ProductListPageComponent },
        ]),
      ],
      providers: [UserService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('formSubmit with correct credentials should redirect to products ', () => {
    userService.login = (user: UserLogin) => {
      return of({
        token: 'whatever',
      });
    };

    component.formSubmit({ username: 'some-user', password: 'some-password' });
    expect(router.navigate).toHaveBeenCalledWith(['/products']);
  });

  it('formSubmit with incorrect credentials should set error string', () => {
    userService.login = (user: UserLogin) =>
      throwError(() => {
        const err = new HttpErrorResponse({
          status: 401,
          statusText: 'this is my error',
        });
        return err;
      });

    component.formSubmit({ username: 'some-user', password: 'some-password' });
    expect(component.errorString).toEqual('this is my error');
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
