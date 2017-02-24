import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ConexionesREST} from "../../providers/conexiones-rest";
import { Storage } from '@ionic/storage';



/*
  Generated class for the ProgramarCitaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
export class HorarioDia{
  public dia: string;
  public horaInicio: string;
  public horaFinal: string;
}
export class HoraReservada{
  horaInicioR: string;
  horaFinalR: string;
}
export class HorasDisponibles{
  public dia: string;
  public horaInicio: string;
  public horaFinal: string;
  public horasReservadas :Array<HoraReservada>;

}
@Component({
  templateUrl: 'programar-cita.html',
})
export class ProgramarCitaPage {
  myDate:string;
  dia:any;
  hora: any;
  matricula: string;
  numeroEconomico: string;
  // horarioDias: any;
  horarioDia :Array<HorarioDia>;
  mostrarFechas: boolean;
  mostrarHoras:boolean;
  minutosPermitidos :String ="0,5,10,15,20,25,30,25,40,45,50,55";
  horasPermitidas : String ="07,08,09,10,11,12,13,14,15,16,17,18,19,20,21";
  horario = {horaInicio:"", horaFinal:""};
  horasDisponibles : HorasDisponibles;
  asunto: string;
  mensaje : string;

  constructor(public navCtrl: NavController,public storage: Storage, public conexion:ConexionesREST ) {
      this.storage.get("matricula").then((name) => {
      this.matricula=name;});
  }

  buscarProfesor(){
    this.conexion.getHorarioActual(this.numeroEconomico).subscribe(data=>{
      if(data.dias!=null){
         console.log(data);
      // this.horarioDias=data;
      this.horarioDia= data.dias;
      this.mostrarFechas= true;
      }else if(data.message!=null){
        alert(data.message);
      }
    });
  }

  buscarDisponibilidad(){
      this.conexion.getDisponibilidad(this.myDate+"-"+this.numeroEconomico).subscribe(data=>{
      // this.horarioDias=data;
      if(data.message==null){
        this.horasDisponibles= data;
        console.log(this.horasDisponibles);
        this.horario.horaInicio= this.horasDisponibles.horaInicio;
        this.horario.horaFinal = this.horasDisponibles.horaFinal;
        this.mostrarHoras=true;
        console.log(this.horasDisponibles.horasReservadas);
        console.log(this.horasDisponibles.horasReservadas.length);
        if(this.horasDisponibles.horasReservadas.length==0)
        {this.mensaje="aún no se han reservado citas";
        }else{
          this.mensaje="horas reservadas: ";
        }
      }else{
        alert(data.message);
      }
    });
  }

  reservarCita(){
    var cita = {horaInicio: this.horario.horaInicio,
                horaFinal:this.horario.horaFinal,
                asunto:this.asunto,
                fecha:this.myDate,
                matricula:this.matricula,
                numeroEconomico:this.numeroEconomico,
                dia: this.horasDisponibles.dia,
              };
      this.conexion.reservarCita(cita).subscribe(data=>{
        if(data.message!=null){
          alert(data.message);
               this.conexion.getProfesor(cita.numeroEconomico).subscribe(data=>{
                  //alert(JSON.stringify(data));
                  if(data.token!=null){
                    var mensaje = "Nueva solicitud - " + cita.matricula + " : " + cita.asunto; 
                    this.conexion.push(data.token,mensaje).subscribe(data=>{
                     // alert(JSON.stringify(data));
                    });
                  }
                
              });

          this.navCtrl.setRoot(ProgramarCitaPage);
        }
        
      });
     
  }



}
