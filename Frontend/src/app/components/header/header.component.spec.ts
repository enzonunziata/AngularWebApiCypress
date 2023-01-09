import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { FakeUser } from '../../utils/fake-user';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userService: UserService;
  let userServiceSpy: any;
  let router: Router;

  beforeEach(async () => {
    userServiceSpy = {};
    userServiceSpy['logout'] = jest.fn();
    userServiceSpy['currentUser$'] = jest.fn();
    userServiceSpy.currentUser$ = of(null);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', component: LoginComponent },
        ]),
      ],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    router = TestBed.inject(Router);

    jest.spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render "not logged in"', () => {
    userService.currentUser$ = of(null);

    component.ngOnInit();
    fixture.detectChanges();

    const headerElement: HTMLElement = fixture.nativeElement;
    const p = headerElement.querySelector('p')!;
    expect(p.textContent!.trim()).toEqual('You are currently not logged in.');
  });

  it('should render fullname', () => {
    var fakeUser = new FakeUser();
    userService.currentUser$ = of(fakeUser.data());

    component.ngOnInit();
    fixture.detectChanges();

    const headerElement: HTMLElement = fixture.nativeElement;
    const p = headerElement.querySelector('p')!;
    const strong = headerElement.querySelector('strong')!;

    expect(p.innerHTML.trim()).toContain('You are logged in as');
    expect(strong.innerHTML.trim()).toContain(fakeUser.data().fullname);
  });

  it('can logout', () => {
    var fakeUser = new FakeUser();
    userService.currentUser$ = of(fakeUser.data());

    component.ngOnInit();
    fixture.detectChanges();

    userService.logout = () => {
      userService.currentUser$ = of(null);
    };

    component.logout();
    component.ngOnInit();
    fixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/login']);

    const headerElement: HTMLElement = fixture.nativeElement;
    const p = headerElement.querySelector('p')!;
    expect(p.textContent!.trim()).toEqual('You are currently not logged in.');
  });
});
