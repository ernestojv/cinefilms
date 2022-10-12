import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  apiUrl = environment.API_URL + '/purchase';

  constructor(
    private http: HttpClient
  ) { }

  addPurchase(purchase: any) {
    return this.http.post(this.apiUrl, purchase);
  }

  getPurchases() {
    return this.http.get(this.apiUrl);
  }

  getPurchaseById(id: number) {
    return this.http.get(this.apiUrl + '/' + id);
  }

  getPurchasesByUserId(id: number) {
    return this.http.get(this.apiUrl + '/user/' + id);
  }

  getPurchasesByShowId(id: number) {
    return this.http.get(this.apiUrl + '/show/' + id);
  }

  getPurchasesByDate(date: string) {
    return this.http.get(this.apiUrl + '/date/' + date);
  }

  getPurchasesByDateRange(date1: string, date2: string) {
    return this.http.get(this.apiUrl + '/date/' + date1 + '/' + date2);
  }

  updatePurchase(id: number, purchase: any) {
    return this.http.put(this.apiUrl + '/' + id, purchase);
  }

  deletePurchase(id: number) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
