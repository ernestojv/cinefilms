import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getProfile().subscribe(() => {
      this.authService.loggedUser.subscribe(user => {
        if (user) {
          this.redirect(user);
        }
      })
    })
  }

  redirect(user: any) {
    switch (user.role) {
      case 'admin':
        this.router.navigate(['/cms']);
        break;
      case 'user':
        this.router.navigate(['/home']);
        break;
      case 'employee':
        this.router.navigate(['/idk']);
        break;
    }
  }
  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      Swal.fire({
        title: 'Error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        text: 'Por favor, llene todos los campos',
        icon: 'error'
      });
      return;
    }

    let email = this.loginForm.value.email ? this.loginForm.value.email : '';
    let password = this.loginForm.value.password ? this.loginForm.value.password : '';

    try {
      this.authService.login(email, password).subscribe(user => {
        if (user) {
          Swal.fire({
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
          });
          window.location.reload();
        }
      });
    } catch (error: any) {
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500
      });
    }


  }

}
