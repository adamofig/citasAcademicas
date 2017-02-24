import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { SesionEstudiantePage } from '../sesion-estudiante/sesion-estudiante';
import { SesionProfesorPage} from  "../sesion-profesor/sesion-profesor";
import { RegistroPage} from "../registro/registro";
import {ConexionesREST} from "../../providers/conexiones-rest";
import {StorageProvider} from "../../providers/storage-provider";


//para form de html
import { FormBuilder, Validators } from '@angular/forms';
import {Push,PushToken} from '@ionic/cloud-angular';

/*
  Generated class for the InicioPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'inicio.html',
  
})
export class InicioPage {
  alumnoPrueba: any;
  valoresFormulario: any;//para agrupar los valores de los inputs
  token: string;
   
  
  constructor(public push: Push,public menuCtrl: MenuController, public navCtrl: NavController, public formBuilder : FormBuilder, private conexion:  ConexionesREST ,public storageProvider : StorageProvider   ) {
   //deshabilita los menus
   this.menuCtrl.enable(false, 'menuProfesor');
   this.menuCtrl.enable(false, 'menuEstudiante');

    //registra el teleforno para las push    
     this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      console.log('Token saved:', t.token);
      //se guarda el token guardar en memoria también 
      this.token= t.token;
      //alert(t.token);
    });

  this.push.rx.notification()
    .subscribe((msg) => {
      alert(msg.title + ': ' + msg.text);
  });
 
  
  //liga el formularo al código 
   this.valoresFormulario = this.formBuilder.group({
     id: ["",[Validators.maxLength(10),Validators.required]],
     contrasena : ["",Validators.required],
     
   });

   //elimina los datos en cache si había 
    storageProvider.clearData("matricula");
    storageProvider.clearData("numeroEconomico");
    storageProvider.clearData("nombre");
    storageProvider.clearData("apellido");

  }


  //conecta con el servidor envia json con id y contraseña recupera json con datos de la sesión
  iniciarSesion(){
    var tokenAndroid;
    if(this.token!= null){
      tokenAndroid= this.token;
    }
    var datosSesion = {
      "id": this.valoresFormulario.value.id,
      "contrasena" : this.valoresFormulario.value.contrasena,
      "token" : tokenAndroid,
    };
    
    this.conexion.login(datosSesion).subscribe(data => {
      if(data.matricula!=null){ //guarda datos de alumno
        this.storageProvider.saveData("matricula",data.matricula);
        this.storageProvider.saveData("nombre",data.nombre);
        this.storageProvider.saveData("apellido",data.apellido);
        this.storageProvider.saveData("carrera",data.carrera);
        this.storageProvider.saveData("correo",data.correo);
        this.storageProvider.saveData("urlFoto",data.urlFoto);
        // envia a sesion alumno
        this.navCtrl.setRoot(SesionEstudiantePage,data);
      }
      if(data.numeroEconomico!=null)
        { // guarda datos de profesor
        this.storageProvider.saveData("numeroEconomico",data.numeroEconomico);
        this.storageProvider.saveData("nombre",data.nombre);
        this.storageProvider.saveData("apellido",data.apellido);
        this.storageProvider.saveData("cubiculo",data.cubiculo);
        this.storageProvider.saveData("correo",data.correo);
        this.storageProvider.saveData("urlFoto",data.urlFoto);
            
            //cambia de pagina y envia datos
        this.navCtrl.setRoot(SesionProfesorPage,data);

      }
      if(data.message!=null){
        alert(data.message);
      }
                },
                err => {
                    alert("problemas en el servidor");
                });         
  }

  irARegistro(){
    this.navCtrl.push(RegistroPage);
  }

}
