import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = environment.API_URL + '/category';

  constructor(
    private http: HttpClient
  ) { }

  addCategory(category: Category) {
    return this.http.post(this.apiUrl, category);
  }

  getCategories() {
    return this.http.get<Category[]>(this.apiUrl);
  }

  getCategoryById(id: string) {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  getCategoryByName(name: string) {
    return this.http.get<Category>(`${this.apiUrl}/name/${name}`);
  }

  updateCategory(id: string, category: Category) {
    return this.http.put(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
