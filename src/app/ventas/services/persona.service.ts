import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(public http:HttpClient) { }

  getPersonaList(){
    return this.http.get(environment.apiURLS+'/Personas');
     
  }
}
