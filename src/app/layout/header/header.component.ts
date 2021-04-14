import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/authentication/token.service';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  resultMsg: string;
  username: string;
  logged = false;

  constructor(private tokenService: TokenService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.username = this.tokenService.getUserName();
      this.logged = true;
    }
  }
  btnLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      this.resultMsg = result;
      if (result) {
        Swal.fire(
          'Exito!',
          'Usted inicio sesion correctamente. ¡Bienvenido!',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      } else if (result == false) {
        this.btnSignup();
      }
      this.ngOnInit();
    });
  }
  btnSignup() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.resultMsg = result;
      if (result) {
        Swal.fire(
          'Exito!',
          'Usted se registro correctamente. ¡Bienvenido!',
          'success'
        );
      } else if (result == false) {
        this.btnLogin();
      }
      this.ngOnInit();
    });
  }
  btnLogout() {
    this.tokenService.logOut();
    window.location.reload();
    this.logged = false;
  }
}
