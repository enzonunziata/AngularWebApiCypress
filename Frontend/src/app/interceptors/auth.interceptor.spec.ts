import { HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptor, UserService],
      imports: [HttpClientTestingModule],
    });

    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should set the authentication token', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    const requestMock = new HttpRequest('GET', '/api/test');
    jest.spyOn(userService, 'token', 'get').mockReturnValue('my-token');

    const nextMock: any = {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('authorization')).toBe(`Bearer my-token`);
        return new Observable<HttpEvent<any>>();
      },
    };

    interceptor.intercept(requestMock, nextMock).subscribe(() => {});
  });
});
