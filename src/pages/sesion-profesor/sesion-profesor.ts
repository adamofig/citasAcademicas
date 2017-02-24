import { Component } from '@angular/core';
import { NavController, MenuController,NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {ConexionesREST} from "../../providers/conexiones-rest";


/*
  Generated class for the SesionProfesorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class CitasProximas{
  apellido: string;
  asunto: string;
  matricula: string;
  dia: string ;
  fecha: string;
  horaFinal: string;
  horaInicio: string;
  nombre: string;
  urlFoto: string;
}

@Component({
  templateUrl: 'sesion-profesor.html',
})
export class SesionProfesorPage {
  public profesor : any;
  citasProximas:Array<CitasProximas>=[];
  mensaje:string;

  constructor(public conexion: ConexionesREST, public params: NavParams,public navCtrl: NavController, public menuCtrl: MenuController,public storage : Storage) {
    this.menuCtrl.enable(true,"menuProfesor");
    
    this.profesor = {
      numeroEconomico: "",
      nombre : "",
      apellido: "",
      cubiculo: "",
      correo: "",
      urlfoto: null,
    }
    console.log("DATOS RECIBIDOS"); 
    console.log(this.params.data);

     if(this.params.get("numeroEconomico")){
      this.profesor = {
      numeroEconomico: this.params.get("numeroEconomico"),
      nombre : this.params.get("nombre"),
      apellido: this.params.get("apellido"),
      cubiculo: this.params.get("cubiculo"),
      correo: this.params.get("correo"),
      urlfoto: this.params.get("urlFoto"),
      }
      this.getCitasProximas(this.profesor.numeroEconomico);

    }else{ 
      console.log("no se envió nada,  buscar en disco");

      this.storage.get("numeroEconomico").then((name) => {
          this.profesor.numeroEconomico=name;
          this.getCitasProximas(this.profesor.numeroEconomico);
        });

        this.storage.get("nombre").then((name) => {
          this.profesor.nombre=name;
        });

        this.storage.get("apellido").then((name) => {
          this.profesor.apellido=name;
        });
        
        this.storage.get("cubiculo").then((name) => {
          this.profesor.carrera=name;
        });
        
        this.storage.get("correo").then((name) => {
          this.profesor.correo=name;
        });

        this.storage.get("urlFoto").then((name) => {
          this.profesor.urlfoto=name;
          console.log(this.profesor.urlfoto);
        });
    }
  }

  getCitasProximas(numeroEconomico){
      this.conexion.getCitasProximasProfesor(numeroEconomico).subscribe(data=>{
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