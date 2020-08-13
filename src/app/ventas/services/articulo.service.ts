import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http:HttpClient) { }

  getArticuloList(){

    return this.http.get(environment.apiURLS+'/Articulos');
     
  }
}
