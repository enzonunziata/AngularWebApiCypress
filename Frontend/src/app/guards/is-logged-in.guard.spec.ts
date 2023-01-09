import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { UserService } from '../services/user.service';
import { IsLoggedInGuard } from './is-logged-in.guard';

describe('IsLoggedInGuard', () => {
  let guard: IsLoggedInGuard;
  let userService: UserService;
  let router: Router;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/whatever' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [UserService],
    });

    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);
    guard = TestBed.inject(IsLoggedInGuard);

    jest.spyOn(router, 'navigate');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login if not logged in', () => {
    userService.isLoggedIn$ = of(false);
    (
      guard.canActivate(routeMock, routeStateMock) as Observable<boolean>
    ).subscribe((val) => {
      expect(val).toEqual(false);
    });
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('canActivate() should return true if logged in', () => {
    userService.isLoggedIn$ = of(true);
    (
      guard.canActivate(routeMock, routeStateMock) as Observable<boolean>
    ).subscribe((val) => {
      expect(val).toEqual(true);
    });
    expect(router.navigate).not.toHaveBeenCalled();
  });
});
