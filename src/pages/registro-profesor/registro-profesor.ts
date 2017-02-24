import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { InicioPage} from "../inicio/inicio"; 
import {ConexionesREST} from "../../providers/conexiones-rest";
import {FormBuilder, Validators } from '@angular/forms';
/*
  Generated class for the RegistroProfesorPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'registro-profesor.html',
})
export class RegistroProfesorPage {
  valoresForm : any;

  constructor(public formBuilder : FormBuilder, public navCtrl: NavController, public menuCtrl: MenuController, private conexion : ConexionesREST) {
     this.menuCtrl.enable(true,"menuProfesor");
        // desabilitar este menu o borror linea
     this.valoresForm = this.formBuilder.group({
     numeroEconomico: ["",Validators.required],
     nombre : ["",Validators.required],
     apellido : ["",Validators.required],
     cubiculo : ["",Validators.required],
     correo : ["",Validators.required],
     contrasena : ["",Validators.required],
     urlFoto : [""],
   });
  }

    abrirInicio(){
    this.navCtrl.setRoot(InicioPage);
    }

    registrarProfesor(){
      this.conexion.registroProfesor(this.valoresForm.value).subscribe(data => {                  
      alert(data.message);
      this.navCtrl.setRoot(InicioPage);
      
      },
      err => {
          alert("problemas en el servidor");
      });
      
    }


}
