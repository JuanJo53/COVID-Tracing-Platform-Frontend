import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/core/authentication/token.service';
import { BoliviaService } from 'src/app/core/http/bolivia.service';
import { DepartmentService } from 'src/app/core/http/department.service';
import { FileService } from 'src/app/core/services/file.service';
import { Bolivia } from 'src/app/shared/models/bolivia';
import { BoliviaData } from 'src/app/shared/models/bolivia-data-list';
import { Department } from 'src/app/shared/models/department';
import * as fileSaver from 'file-saver';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';
import { SignupComponent } from 'src/app/modules/auth/signup/signup.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bolivia-page',
  templateUrl: './bolivia-page.component.html',
  styleUrls: ['./bolivia-page.component.scss'],
})
export class BoliviaPageComponent implements OnInit {
  deptos: Department[];
  data: BoliviaData[];
  bolivia: Bolivia;

  displayedColumns = [
    'Fecha',
    'Casos Confirmados',
    'Muertes',
    'Recuperados',
    'Vacunados 1ra Dosis',
    'Vacunados 2da Dosis',
  ];

  mapReady = false;
  dataReady = false;

  resultMsg: string;

  selectedView = 'table';

  constructor(
    private departmentService: DepartmentService,
    private downloadService: FileService,
    private tokenService: TokenService,
    public dialog: MatDialog,
    private boliviaService: BoliviaService
  ) {}

  ngOnInit(): void {
    this.refreshDataView();
    this.fetchDepartments();
    this.getBoliviaDetails();
  }
  fetchDepartments() {
    this.departmentService.getAllDepartments().subscribe((deptos) => {
      console.log(deptos);
      this.deptos = deptos;
    });
  }

  getBoliviaDetails() {
    this.boliviaService.getBoliviaDetails().subscribe((bol) => {
      this.bolivia = bol;
      if (Object.keys(this.bolivia).length > 0) {
        this.dataReady = true;
      } else {
        this.dataReady = false;
      }
    });
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
      this.downloadService.countryDownload('BOL').subscribe((result: any) => {
        const blob: any = new Blob([result], {
          type: 'application/csv; charset=utf-8',
        });
        fileSaver.saveAs(blob, `bolivia_data.csv`);
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
