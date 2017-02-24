import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ConexionesREST provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConexionesREST {
  urlServer: string = 'http://148.206.94.213:8080/CitasUAM/rest/';
  constructor(public http: Http) {

    console.log('Hello ConexionesREST Provider');
  }
 
    login(datosSesion){
        var response = this.http.post(this.urlServer+"login",datosSesion).map(res => res.json());
		return response;  
    }
    
    registroEstudiante(datosRegistro){
        var response = this.http.post(this.urlServer+"estudiantes",datosRegistro).map(res => res.json());
        return response;
    }
    getEstudiante(matricula){
        var response = this.http.get(this.urlServer+"estudiantes/"+ matricula).map(res => res.json());
        return response;
    }
    registroProfesor(datosRegistro){
        var response = this.http.post(this.urlServer+"profesores",datosRegistro).map(res => res.json());
        return response; 
    }
    
    getProfesor(numeroEconomico){
        var response = this.http.get(this.urlServer+"profesores/"+ numeroEconomico).map(res => res.json());
        return response; 
    }
    registrarHorario(datosHorario){
      var response = this.http.post(this.urlServer+"horarioProfesores",datosHorario).map(res => res.json());
      return response; 
    }

    getHorarioActual(numeroEconomico){
       var response = this.http.get(this.urlServer+"horarioProfesores/"+numeroEconomico).map(res => res.json());
      return response;
    }

    getDisponibilidad(param){
      var response = this.http.get(this.urlServer+"citas/"+param).map(res => res.json());
      return response;
    }

    reservarCita(cita){
      var response = this.http.post(this.urlServer+"citas",cita).map(res => res.json());
      return response; 
    }

    AceptarCita(idCita){
      var response = this.http.put(this.urlServer+"citas",idCita).map(res => res.json());
		  return response;  
    }

      getCitasProximasEstudiante(matricula: string){
      var response = this.http.get(this.urlServer+"citasProximasEstudiante/"+matricula).map(res => res.json());
      return response;
    }

      getCitasProximasProfesor(numeroEconomico : string){
      var response = this.http.get(this.urlServer+"citasProximasProfesor/"+numeroEconomico).map(res => res.json());
      return response;
    }

    push(token, mensaje){
      var header = new Headers({"Content-Type" : "application/json" , "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5ZmZkMGYwOC01MjBiLTQxMzItOGI2Ni1iOTZmZWI4ZGM0ZTUifQ.CjQ_w9OSMl9vEplWmDHFWhramUaYehAyXw06yFlCEx4"});
      var json = {
        "tokens": [token],
        "profile": "citas",
        "notification": {
            "message": mensaje
        }
      }

      var response = this.http.post("https://api.ionic.io/push/notifications",json,{ headers: header }).map(res => res.json());
      return response;
    }
}
