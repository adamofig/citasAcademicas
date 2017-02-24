import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConexionesREST} from "../../providers/conexiones-rest";
import { Storage } from '@ionic/storage';
import {SesionProfesorPage} from "../sesion-profesor/sesion-profesor";




export class HorarioDia{
  public dia: string;
  public horaInicio: string;
  public horaFinal: string;
}
/*
  Generated class for the HorarioProfesorNuevo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-horario-profesor-nuevo',
  templateUrl: 'horario-profesor-nuevo.html'
})
export class HorarioProfesorNuevo {
  trimestre: string;
  minutosPermitidos :String ="0,5,10,15,20,25,30,25,40,45,50,55";
  horasPermitidas : String ="07,08,09,10,11,12,13,14,15,16,17,18,19,20,21";
  numDiasAsesoria: number=0; 
  horarioDia :Array<HorarioDia>=[];
  registrar: boolean;

  
  
  numeroEconomico: string;
  
  
  constructor(public navCtrl: NavController,  private conexion : ConexionesREST, public storage : Storage) {
     
         this.storage.get("numeroEconomico").then((name) => {
          this.numeroEconomico=name;
         });

  }

  
  registrarHorario(){

    var trimestreHorarioDias = {
      numeroEconomico: this.numeroEconomico,
      trimestre: this.trimestre,
      horarioDias: this.horarioDia,
    }
      
      console.log(trimestreHorarioDias);
      this.conexion.registrarHorario(trimestreHorarioDias).subscribe(data => {                  
      alert(data.message);
      this.navCtrl.setRoot(SesionProfesorPage);
      },
      err => {
          alert("problemas en el servidor");
      });

  }


  agregarDias(){
    this.horarioDia=[];
    for(var i =0;i< this.numDiasAsesoria; i++)
    this.horarioDia.push({dia:"",horaInicio:"",horaFinal:""});
    this.registrar= true;
  }



}




