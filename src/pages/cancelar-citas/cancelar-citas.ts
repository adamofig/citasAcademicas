import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConexionesREST} from "../../providers/conexiones-rest";
import { Storage } from '@ionic/storage';


/*
  Generated class for the CancelarCitasPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class CitasPendientes{
public asunto :string;
public estatus: string;
public estudiante_matricula:string;
public fecha:string;
public horaFinal:string;
public horaInicio: string;
public horariodias_idHorario:string;
public idCita:string;
public numeroEconomico:string;
public nombreEstudiante:string;
}

@Component({
  templateUrl: 'cancelar-citas.html',
})
export class CancelarCitasPage {
listaCitas:Array <CitasPendientes>;
numeroEconomico: string;
mensaje: string = "buscando...";

  constructor(public storage:Storage,public navCtrl: NavController,public conexion:ConexionesREST) {
      



      this.storage.get("numeroEconomico").then((name) => {
        this.numeroEconomico=name;
        this.conexion.getDisponibilidad(this.numeroEconomico).subscribe(data=>{
          // this.horarioDias=data;
          if(data.message==null){
            console.log(data);
            this.listaCitas= data.listaCitas;
            if(this.listaCitas.length==0){
              this.mensaje="sin citas pendientes";
            }else{
              this.mensaje="";
            }
            console.log(this.listaCitas);
            
          }else{
            alert(data.message);
          }    
        });

      });

  }

  reservarCita( idCita:string, matricula: string ){
    var cambioCita={
      "idCita": idCita,
      "estatus": "aceptada"
    }
    alert(matricula);
    this.conexion.AceptarCita(cambioCita).subscribe(data=>{
      console.log(data);
      if(data.message==null){
        alert("Cita aceptada");

              this.conexion.getEstudiante(matricula).subscribe(data=>{                
                  //alert(JSON.stringify(data));
                  if(data.token!=null){
                    var mensaje = "Cita aceptada : " + this.numeroEconomico  ; 
                    this.conexion.push(data.token,mensaje).subscribe(data=>{
                      //alert(data);
                    });
                  }
              });

      this.navCtrl.setRoot(CancelarCitasPage);
      }else{
        alert( data.message);
      }
    });
  }


  cancelarCita(idCita:string, matricula: string){
        var cambioCita={
      "idCita": idCita,
      "estatus": "cancelada"
    }
    this.conexion.AceptarCita(cambioCita).subscribe(data=>{
      console.log(data);
      if(data.message==null){
        alert("Cita cancelada");
              this.conexion.getEstudiante(matricula).subscribe(data=>{                
                  //alert(JSON.stringify(data));
                  if(data.token!=null){
                    var mensaje = "Cita rechazada : " + this.numeroEconomico  ; 
                    this.conexion.push(data.token,mensaje).subscribe(data=>{
                      //alert(data);
                    });
                  }
              });
        this.navCtrl.setRoot(CancelarCitasPage);

      }else{
        alert( data.message);
      }
    });
  }
  
}
