import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('initial error string should be empty', () => {
    expect(component.errorString).toBe('');
  });

  it('should set error string if form is invalid', () => {
    component.submit();
    expect(component.errorString).toBe('Invalid form values');
  });

  it('should emit event with credentials', () => {
    jest.spyOn(component.onFormSubmit, 'emit');

    component.form.setValue({
      username: 'some-username',
      password: 'some-password',
    });
    component.submit();

    fixture.detectChanges();
    expect(component.onFormSubmit.emit).toHaveBeenCalledWith({
      username: 'some-username',
      password: 'some-password',
    });
  });
});
