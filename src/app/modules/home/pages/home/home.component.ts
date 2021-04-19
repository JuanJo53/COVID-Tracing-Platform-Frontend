import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}
  openSnackBar() {
    this._snackBar.open('Copiado al portapapeles', 'OK', {
      duration: 2000,
    });
  }
}
