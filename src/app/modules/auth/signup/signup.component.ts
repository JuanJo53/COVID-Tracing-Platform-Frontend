import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  user: User;
  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.editClient();
  }
  editClient(): void {
    this.form = this.fromBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      firstSurname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      secondSurname: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
      userName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(6),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.minLength(6),
        ],
      ],
    });
  }

  saveUser(): void {
    if (this.form.valid) {
      const client = this.form.value;
      console.log(client);
      this.createClient(client);
    } else {
      console.log('Algo salio mal');
    }
  }
  createClient(newUser: User): void {
    this.authService.createUser(newUser).subscribe((user) => {
      console.log(user);
      this.router.navigate(['/', 'login']);
      Swal.fire('Any fool can use a computer');
    });
  }
}
