import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import Swal from 'sweetalert2';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product | null = null;

  productForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    image: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        let id = params.get('id') || '';
        this.getProduct(id);
      }
    });
  }

  getProduct(id: string) {
    this.productService.getProductById(id).subscribe(
      (product: any) => {
        this.product = product.data;
        if (this.product) {
          this.productForm.setValue({
            name: this.product.name,
            description: this.product.description,
            price: this.product.price.toString(),
            image: this.product.image
          });
        }
      }
    )
  }

  addProduct() {
    if (!this.productForm.invalid && this.product) {
      const product: Product = {
        name: this.productForm.value.name || '',
        description: this.productForm.value.description || '',
        price: +(this.productForm.value.price || 0),
        image: this.productForm.value.image || '',
      }

      try {
        this.productService.updateProduct(this.product._id || '', product).subscribe(
          (product: any) => {
            Swal.fire({
              title: 'Completado',
              text: 'El producto se ha actualizado correctamente',
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
