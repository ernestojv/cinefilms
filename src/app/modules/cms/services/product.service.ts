import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.API_URL + '/product';

  constructor(
    private http: HttpClient
  ) { }

  addProduct(product: Product) {
    return this.http.post(this.apiUrl, product);
  }

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductById(id: string) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  getProductsByName(name: string) {
    return this.http.get(this.apiUrl + '/name/' + name);
  }

  updateProduct(id: string, product: Product) {
    return this.http.put(this.apiUrl + '/' + id, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
