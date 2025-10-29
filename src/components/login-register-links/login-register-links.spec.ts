import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginRegisterLinks } from './login-register-links';

describe('LoginRegisterLinks', () => {
  let component: LoginRegisterLinks;
  let fixture: ComponentFixture<LoginRegisterLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterLinks]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterLinks);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
