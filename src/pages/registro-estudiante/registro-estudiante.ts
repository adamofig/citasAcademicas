import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {InicioPage} from "../inicio/inicio";
import {FormBuilder, Validators } from '@angular/forms';
import {ConexionesREST} from "../../providers/conexiones-rest";



/*
  Generated class for the RegistroEstudiantePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'registro-estudiante.html',
})
export class RegistroEstudiantePage {
  valoresForm : any;
  
  constructor(public formBuilder : FormBuilder, public navCtrl: NavController, private conexion : ConexionesREST) {
     
     this.valoresForm = this.formBuilder.group({
     matricula: ["",Validators.required],
     nombre : ["",Validators.required],
     apellido : ["",Validators.required],
     carrera : ["",Validators.required],
     correo : ["",Validators.required],
     contrasena : ["",Validators.required],
     urlFoto : [""],
   });
  }

  irAInicio(){
    this.navCtrl.setRoot(InicioPage);
  }
  
  registrarEstudiante(){
    var datosRegistro = this.valoresForm.value;
    console.log(datosRegistro);
      this.conexion.registroEstudiante(datosRegistro).subscribe(data => {                  
      alert(data.message);
      this.navCtrl.setRoot(InicioPage);
      },
      err => {
          alert("problemas en el servidor");
      });
  }

}
