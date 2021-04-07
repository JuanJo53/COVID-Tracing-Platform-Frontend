import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { TokenService } from 'src/app/core/authentication/token.service';
import { LoginUser } from 'src/app/shared/models/login-user';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  isLoginFail = false;
  roles: string[] = [];
  loginUser: LoginUser;

  errMsj: string;

  constructor(
    private fromBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
    this.form = this.fromBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    if (this.form.valid) {
      const usr = this.form.value;
      this.onLogin(usr);
    }
  }
  onLogin(user: LoginUser) {
    this.authService.logIn(user).subscribe(
      (data) => {
        this.isLogged = true;
        this.isLoginFail = false;
        console.log(data);
        this.tokenService.setToken(data.access_token);
        this.tokenService.setUserId(data.userId);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.role);
        if (this.tokenService.getAuthorities() == '["ROLE_ADMIN"]') {
          this.router.navigate(['/admin']);
        } else if (this.tokenService.getAuthorities() == '["ROLE_USER"]') {
          this.router.navigate(['/home/dashboard']);
        }
        this.dialogRef.close(true);
      },
      (err) => {
        this.isLogged = false;
        this.isLoginFail = true;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Usuario o contraseña incorrectos!',
          footer: '<p>Error Escpecifico: ' + err.toString() + '</p>',
        });
      }
    );
  }
}
