import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  btnLogin() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.resultMsg = result;
      if (result) {
        Swal.fire(
          'Exito!',
          'Usted inicio sesion correctamente. ¡Bienvenido!',
          'success'
        );
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
      }
      this.ngOnInit();
    });
  }
}
