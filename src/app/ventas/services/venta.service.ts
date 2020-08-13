import { Injectable } from '@angular/core';
import { Venta } from '../Model/venta.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VentaArticulo } from '../Model/venta-articulo.model';

@Injectable({
  providedIn: 'root'
})

export class VentaService {
  formData: Venta;  
  ventaArticulos:VentaArticulo[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      ventaArticulos: this.ventaArticulos
    }
    return this.http.post(environment.apiURL + '/Order', body);
  }

  getVentaByID(id: number): any {
    return this.http.get(environment.apiURLS + '/Ventas/' + id);
  }
}
