import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.editUser();
  }
  editUser(): void {
    this.form = this.fromBuilder.group(
      {
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
        role: [2, [Validators.required]],
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', Validators.compose([Validators.required])],
      },
      {
        validator: this.confirmPasswordMatch('password', 'confirmPassword'),
      }
    );
  }
  confirmPasswordMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      // console.log(controlName, matchingControlName)
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  saveUser(): void {
    if (this.form.valid) {
      const client = this.form.value;
      const key = 'confirmPassword';
      delete client[key];
      this.createUser(client);
    } else {
      console.log('Algo salio mal');
    }
  }
  createUser(newUser: User): void {
    this.authService.createUser(newUser).subscribe((user) => {
      console.log(user);
      Swal.fire('Registro Exitoso!', 'Ahora puedes iniciar sesión!', 'success');
      this.dialogRef.close(false);
    });
  }
  onClickLoginBtn() {
    this.dialogRef.close(false);
  }
}
