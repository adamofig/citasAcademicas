import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import {InicioPage} from "../inicio/inicio";
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
  
})
export class IntroPage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public storage: Storage) {
   this.menuCtrl.enable(false, 'menuProfesor');
   this.menuCtrl.enable(false, 'menuEstudiante');
   this.storage.set("intro","true");
  }
  irAInicio(){
    this.navCtrl.setRoot(InicioPage);
  }

}
