import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addCategory() {
    if (!this.categoryForm.invalid) {
      const category = {
        name: this.categoryForm.value.name || '',
      }

      try {
        this.categoryService.addCategory(category).subscribe(
          (category: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'La categoría se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/cms/category']);
          }
        )
      } catch (error: any) {
        Swal.fire({
          title: 'Error',
          text: error.meesage,
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, ingrese todos los datos',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    }
  }

}
