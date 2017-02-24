import { Component } from '@angular/core';
import { NavController,MenuController,NavParams  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ConexionesREST} from "../../providers/conexiones-rest";


/*
  Generated class for the SesionEstudiantePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class CitasProximas{
  apellidoProfesor: string;
  asunto: string;
  cubiculo: string;
  dia: string ;
  fecha: string;
  horaFinal: string;
  horaInicio: string;
  nombreProfesor: string;
  urlFoto: string;
}

@Component({
  templateUrl: 'sesion-estudiante.html',
})
export class SesionEstudiantePage {
  alumno:any;
  menuAbierto:boolean;
  citasProximas:Array<CitasProximas>=[];
  mensaje:string;
  pruebaString : any;

  constructor(public conexion: ConexionesREST, public navCtrl: NavController,public menuCtrl: MenuController,public params: NavParams,public storage : Storage) {
   this.menuCtrl.enable(true,"menuEstudiante");

    // es necesario definir el objeto alumno
    this.alumno = {
      matricula: "",
      nombre : "",
      apellido: "",
      carrera: "",
      correo: "",
      urlFoto: null,
    }

    //compara si es la primera vez que entra, ya que los datos son enviados como parametros
    if(this.params.get("matricula")){    
      this.alumno = {
      matricula: this.params.get("matricula"),
      nombre : this.params.get("nombre"),
      apellido: this.params.get("apellido"),
      carrera: this.params.get("carrera"),
      correo: this.params.get("correo"),
      urlFoto: this.params.get("urlFoto"),
      }
      this.getCitasProximas(this.alumno.matricula);
    }else{ // ya estaba en sesión y los datos estan en disco

      this.storage.get("matricula").then((name) => {
          this.alumno.matricula=name;
          this.getCitasProximas(this.alumno.matricula);
        });

        this.storage.get("nombre").then((name) => {
          this.alumno.nombre=name;
        });

        this.storage.get("apellido").then((name) => {
          this.alumno.apellido=name;
        });
        
        this.storage.get("carrera").then((name) => {
          this.alumno.carrera=name;
        });
        
        this.storage.get("correo").then((name) => {
          this.alumno.correo=name;
        });

        this.storage.get("urlFoto").then((name) => {
          this.alumno.urlFoto=name;
        });
    }



}

getCitasProximas(matricula){
      this.conexion.getCitasProximasEstudiante(matricula).subscribe(data=>{
      console.log(data);
      if(data.message==null){
        console.log("guardar citas");
        this.citasProximas = data;
        console.log(this.citasProximas);
        if(this.citasProximas.length>0){
          this.mensaje=null;
        }else{
          this.mensaje="No hay citas cercanas";
        }
      }else{
        console.log(data.message);
        this.mensaje=null;
      }
    });

}




}
