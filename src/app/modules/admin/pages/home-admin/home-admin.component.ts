import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenService } from 'src/app/core/authentication/token.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  constructor(
    public tokenService: TokenService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  openSnackBar() {
    this._snackBar.open('Copiado al portapapeles', 'OK', {
      duration: 2000,
    });
  }
}
