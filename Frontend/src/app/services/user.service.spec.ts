import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { FakeUser } from '../utils/fake-user';

describe('UserService', () => {
  const STORAGE_AUTH_KEY = 'auth';

  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    let store = new Map<string, string>();
    const localStorageMock = {
      getItem: (key: string): string | null => {
        return store.has(key) ? store.get(key) || '' : null;
      },
      setItem: (key: string, value: string) => {
        store.set(key, value);
      },
      removeItem: (key: string) => {
        store.delete(key);
      },
    };
    jest
      .spyOn(Object.getPrototypeOf(localStorage), 'getItem')
      .mockImplementation((...args: unknown[]) =>
        localStorageMock.getItem(args[0] as string)
      );
    jest
      .spyOn(Object.getPrototypeOf(localStorage), 'setItem')
      .mockImplementation((...args: unknown[]) =>
        localStorageMock.setItem(args[0] as string, args[1] as string)
      );
    jest
      .spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
      .mockImplementation((...args: unknown[]) =>
        localStorageMock.removeItem(args[0] as string)
      );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('initial user should be null', () => {
    service.currentUser$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('initial login status should be false', () => {
    service.isLoggedIn$.subscribe((status) => {
      expect(status).toEqual(false);
    });
  });

  it('after logout user should be null', () => {
    // create an unexpired token
    const fakeUser = new FakeUser();
    const token = fakeUser.token();

    localStorage.setItem(STORAGE_AUTH_KEY, token);
    service = new UserService(TestBed.inject(HttpClient)); // need to test the constructor

    service.currentUser$
      .subscribe((user) => {
        expect(user).toBeTruthy();
      })
      .unsubscribe();

    service.logout();

    service.currentUser$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('if token is expired, no login', () => {
    // create an expired token
    const fakeUser = new FakeUser(true);
    const token = fakeUser.token();

    localStorage.setItem(STORAGE_AUTH_KEY, token);
    service = new UserService(TestBed.inject(HttpClient)); // need to test the constructor

    service.currentUser$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('after login user should have a value', () => {
    // create an unexpired token
    const fakeUser = new FakeUser();
    const token = fakeUser.token();
    const data = fakeUser.data();

    service
      .login({ username: 'my-username', password: 'my-password' })
      .subscribe((res) => {
        expect(res.token).toBe(token);
        service.currentUser$.subscribe((user) => {
          expect(user?.username).toBe(data.username);
          expect(user?.fullname).toBe(data.fullname);
          expect(user?.roles.length).toBe(data.roles.length);
        });
      });

    const req = httpMock.expectOne('/api/user/login');
    req.flush({
      token: token,
    });
  });
});
