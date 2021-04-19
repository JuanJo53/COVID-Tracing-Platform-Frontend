import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/authentication/token.service';
import { FileService } from 'src/app/core/services/file.service';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import { Department } from 'src/app/shared/models/department';
import Swal from 'sweetalert2';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  @Input() depto: Department;

  displayedColumns = [
    'Fecha',
    'Casos Confirmados',
    'Muertes',
    'Recuperados',
    'Vacunados 1ra Dosis',
    'Vacunados 2da Dosis',
  ];

  mapReady = false;

  selectedView = 'table';

  resultMsg: string;

  constructor(
    private tokenService: TokenService,
    private downloadService: FileService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.refreshDataView();
  }

  refreshDataView(): void {
    if (this.selectedView == 'map') {
      this.mapReady = true;
    } else {
      this.mapReady = false;
    }
  }
  btnDownload() {
    if (this.tokenService.getToken()) {
      this.downloadService.download(this.depto.iso).subscribe((result: any) => {
        const blob: any = new Blob([result], {
          type: 'application/csv; charset=utf-8',
        });
        fileSaver.saveAs(blob, `${this.depto.department}_data.csv`);
      }),
        (error) => console.log('Error downloading the file'),
        () => console.info('File downloaded successfully');
    } else {
      this.btnLogin();
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
    });
  }
}
