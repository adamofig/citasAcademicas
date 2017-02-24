import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{HorarioProfesorNuevo}  from "../horario-profesor-nuevo/horario-profesor-nuevo";
import { Storage } from '@ionic/storage';
import {ConexionesREST} from "../../providers/conexiones-rest";



/*
  Generated class for the HorarioProfesor page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-horario-profesor',
  templateUrl: 'horario-profesor.html'
})
export class HorarioProfesorPage {
  public numeroEconomico: string;
  public horarioProfesor: any;

  constructor(public navCtrl: NavController, public storage:Storage, public conexion :ConexionesREST ) {
  
     this.horarioProfesor = {
      trimestreActual:"",
      dias:[{dia:"",horaInicio:"", horaFinal:""}]
      
    }

    this.storage.get("numeroEconomico").then((name) => {
      this.numeroEconomico=name;
      this.conexion.getHorarioActual(this.numeroEconomico).subscribe(data => {
      if(data!=null){
        if(data.trimestreActual!=undefined){
           this.horarioProfesor = data;
        }else{
          this.horarioProfesor.trimestreActual="No se han registrado horarios";
        } 
      }    
    })
  });
  }

  irANuevoHorario(){
    this.navCtrl.push(HorarioProfesorNuevo);
  }
  

}


