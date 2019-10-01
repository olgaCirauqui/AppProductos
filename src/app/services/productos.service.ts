import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProducto } from '../models/producto.interface';
import { UrlApiServidor } from './url-api-servidor';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  urlAPI: string;
  urlAPIServidor: UrlApiServidor;

  constructor(public http: HttpClient) {
    this.urlAPIServidor = new UrlApiServidor();
    this.urlAPI = this.urlAPIServidor.getURLAPI();
  }

  getProductos(): Observable<IProducto[]> {
    const headers = this.urlAPIServidor.getHeaders();

    return this.http.get<IProducto[]>(this.urlAPI + 'Productos', {
      headers: headers
    });
  }

  getProducto(id: number): Observable<IProducto> {
    const headers = this.urlAPIServidor.getHeaders();
    console.log(id);
    return this.http.get<IProducto>(this.urlAPI + 'Productos/' + id, {
      headers: headers
    });
  }

  addProducto(producto: IProducto): Observable<any> {
    const body = JSON.stringify(producto);
    const headers = this.urlAPIServidor.getHeaders();
    return this.http.post(this.urlAPI + 'Productos', body, {
      headers: headers
    });
  }
//la constante body es el producto convertido a string
  updateProducto(producto: IProducto): Observable<any> {
    const body = JSON.stringify(producto);
    const headers = this.urlAPIServidor.getHeaders();

    return this.http.put(
      this.urlAPI + 'Productos/' + producto.id,
      body,
      {
        headers: headers
      }
    );
  }

  deleteProducto(id: number): Observable<any> {
    const headers = this.urlAPIServidor.getHeaders();

    return this.http.delete(this.urlAPI + 'Productos/' + id, {
      headers: headers
    });
  }
}