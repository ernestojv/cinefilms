import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/core/models/category.model';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  categoryForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  category: Category | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getCategory(id);
      }
    });
  }

  updateCategory() {
    if (!this.categoryForm.invalid && this.category) {
      const category = {
        name: this.categoryForm.value.name || '',
      }

      try {
        this.categoryService.updateCategory(this.category._id || '' ,category).subscribe(
          (category: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'La categoría se ha actualizado correctamente',
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

  getCategory(id: string) {
    this.categoryService.getCategoryById(id).subscribe(
      (category: any) => {
        this.category = category.data;
        this.categoryForm.setValue({
          name: category.data.name,
        });
      }
    )
  }

}
