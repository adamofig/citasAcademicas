import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RegistroEstudiantePage} from "../registro-estudiante/registro-estudiante";
import {RegistroProfesorPage} from "../registro-profesor/registro-profesor";

// import {HttpService} from "../../services/http-service.ts"

/*
  Generated class for the RegistroPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'registro.html',
})
export class RegistroPage {
  
  constructor(public navCtrl: NavController) {
  }

  abrirRegistroEstudiante(){
    this.navCtrl.push(RegistroEstudiantePage);
  }
  
  abrirRegistroProfesor(){
    this.navCtrl.push(RegistroProfesorPage);
  }

}
