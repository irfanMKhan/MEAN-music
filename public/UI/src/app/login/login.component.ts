import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  isLogin: boolean = false;
  doRegister: boolean = false;
  doLogin: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _service: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.isLogin = this._service.hasToken();
    this.loginForm = this._formBuilder.group({
      username: '',
      password: '',
    });
    this.registrationForm = this._formBuilder.group({
      name: '',
      username: '',
      password: '',
      repeatPassword: '',
      age: 0,
    });
  }

  login(form: FormGroup) {
    this._service.login(form.value).subscribe((response) => {
      this._service.setToken(response);

      this.doLogin = false;
      this.isLogin = true;
      this.doRegister = false;

      this._router.navigate(['home']);
    });
  }

  registration(form: FormGroup) {
    this._service.registration(form.value).subscribe((response) => {
      this.doRegister = false;   

      this._router.navigate(['home']);
    });
  }

  clickRegister() {
    this.doRegister = true;
  }
  clickLogin() {
    this.doLogin = true;
  }

  clickLogout() {
    this._service.removeToken();

    this.doLogin = false;
    this.isLogin = false;
    this.doRegister = false;
    
    this._router.navigate(['home']);
  }
}
