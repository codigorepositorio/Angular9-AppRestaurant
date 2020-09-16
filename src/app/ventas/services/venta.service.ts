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
  detalleVentas:VentaArticulo[];

  constructor(private http: HttpClient) { }

  saveOrUpdateOrder() {
    var body = {
      ...this.formData,
      detalleVentas: this.detalleVentas
    }
    console.log("BODY=============>",body);
    return this.http.post(environment.apiURLS + '/ventas', body);
  }

  getVentaByID(id: number): any {
    return this.http.get(environment.apiURLS + '/Ventas/' + id);
  }
}
