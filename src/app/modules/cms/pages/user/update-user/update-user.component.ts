import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  user: User | null = null;

  userForm = this.formBuilder.group({
    email: ['', [Validators.required]],
    name: ['', [Validators.required]],
    role: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('email')) {
        let email = params.get('email') || '';
        this.getUserByEmail(email);
      }
    });
  }

  getUserByEmail(email: string) {
    this.userService.getUserById(email).subscribe((user: any) => {
      this.user = user.data;
      if (this.user) {
        this.userForm.setValue({
          email: this.user.email,
          name: this.user.name,
          role: this.user.role,
        });
      }
    });
  }

  addUser() {
    if (this.userForm.valid && this.user) {
      let user: User = {
        email: this.userForm.value.email || '',
        name: this.userForm.value.name || '',
        role: this.userForm.value.role || '',
      }
      try {
        this.userService.updateUser(this.user.email, user).subscribe(
          () => {
            Swal.fire({
              title: 'Completado',
              text: 'Se ha actualizado el usuario correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/cms/user']);
          }
        );
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

}
