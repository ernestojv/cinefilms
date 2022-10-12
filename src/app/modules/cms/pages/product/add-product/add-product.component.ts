import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { Product } from 'src/app/core/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  addProduct() {
    if (!this.productForm.invalid) {
      const product: Product = {
        name: this.productForm.value.name || '',
        description: this.productForm.value.description || '',
        price: +(this.productForm.value.price || 0),
        image: this.productForm.value.image || '',
      }

      try {
        this.productService.addProduct(product).subscribe(
          (product: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'El producto se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/cms/product']);
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
