import {Component,ViewChild} from '@angular/core';
import {Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';


import {InicioPage} from '../pages/inicio/inicio';
import {RegistroPage} from "../pages/registro/registro";

import {IntroPage} from "../pages/intro/intro";
import {ConexionesREST} from "../providers/conexiones-rest";


//paginas de estudiante solo para fines de prueba se usan para obtener los links en el menú
import {SesionEstudiantePage} from "../pages/sesion-estudiante/sesion-estudiante";
import {CalendarioEstudiantePage} from "../pages/calendario-estudiante/calendario-estudiante";
import {ConfiguracionEstudiantePage} from "../pages/configuracion-estudiante/configuracion-estudiante";
import {ProgramarCitaPage} from "../pages/programar-cita/programar-cita";

//páginas de profesor
import {SesionProfesorPage} from "../pages/sesion-profesor/sesion-profesor";
import {CalendarioProfesorPage} from "../pages/calendario-profesor/calendario-profesor";
import {ConfiguracionProfesorPage} from "../pages/configuracion-profesor/configuracion-profesor";
import {CancelarCitasPage} from "../pages/cancelar-citas/cancelar-citas";
import {HorarioProfesorPage} from "../pages/horario-profesor/horario-profesor";


@Component({
  templateUrl: "app.html",
})
export class MyApp {
      
  @ViewChild(Nav) nav: Nav;
  
  public rootPage: any;

  constructor(public conexion: ConexionesREST, private platform: Platform, public menuCtrl: MenuController, public storage:Storage  ) {
       
    this.storage.get("intro").then((name)=>{
    console.log(name);
    if(name!=null){
      this.rootPage= InicioPage;
    }else{
      this.rootPage = IntroPage;
    }
  });

//   this.push.register().then((t: PushToken) => {
//   return this.push.saveToken(t);
// }).then((t: PushToken) => {
//   console.log('Token saved:', t.token);
// });
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });


}

    abrirSesion(){
      this.menuCtrl.close();
      this.nav.setRoot(SesionEstudiantePage);
    }
    abrirProgramar(){
      this.menuCtrl.close();
      this.nav.setRoot(ProgramarCitaPage);
    }
        abrirCalendario(){
      this.menuCtrl.close();
      this.nav.setRoot(CalendarioEstudiantePage);
    }
        abrirConfiguracion(){
      this.menuCtrl.close();
      this.nav.setRoot(ConfiguracionEstudiantePage);
    }
        abrirInicio(){
      this.menuCtrl.close();
      this.nav.setRoot(InicioPage);
    }
    //metodos para menú profesor

    abrirSesionProfesor(){
      this.menuCtrl.close();
      this.nav.setRoot(SesionProfesorPage);
    }
    abrirCancelarCitas(){
      this.menuCtrl.close();
      this.nav.setRoot(CancelarCitasPage);
    }
        abrirCalendarioProfesor(){
      this.menuCtrl.close();
      this.nav.setRoot(CalendarioProfesorPage);
    }
    abrirConfiguracionProfesor(){
      this.menuCtrl.close();
      this.nav.setRoot(ConfiguracionProfesorPage);
    }
    abrirHorarioProfesor(){
      this.menuCtrl.close();
      this.nav.setRoot(HorarioProfesorPage);
    }
    

 
  abrirRegistro(){
    this.nav.push(RegistroPage);
  }

  
  cerrarSesion(){
    this.menuCtrl.close();
    this.nav.setRoot(InicioPage);
  }
      
  }
