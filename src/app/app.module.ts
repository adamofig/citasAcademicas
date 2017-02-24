import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import {Storage} from "@ionic/storage";
import {ConexionesREST} from "../providers/conexiones-rest";
import {StorageProvider} from "../providers/storage-provider";

// mis paginas 
import {CalendarioEstudiantePage} from "../pages/calendario-estudiante/calendario-estudiante";
import {CalendarioProfesorPage} from "../pages/calendario-profesor/calendario-profesor";
import {CancelarCitasPage} from "../pages/cancelar-citas/cancelar-citas";
import {ConfiguracionEstudiantePage} from "../pages/configuracion-estudiante/configuracion-estudiante";
import {ConfiguracionProfesorPage} from "../pages/configuracion-profesor/configuracion-profesor";
import {InicioPage} from "../pages/inicio/inicio";
import {IntroPage} from "../pages/intro/intro";
import {ProgramarCitaPage} from "../pages/programar-cita/programar-cita";
import {RegistroPage} from "../pages/registro/registro";
import {RegistroProfesorPage} from "../pages/registro-profesor/registro-profesor";
import {RegistroEstudiantePage} from "../pages/registro-estudiante/registro-estudiante";
import {SesionEstudiantePage} from "../pages/sesion-estudiante/sesion-estudiante";
import {SesionProfesorPage} from "../pages/sesion-profesor/sesion-profesor";
//import {ConexionHttpServidorService} from "../providers/conexion-http-servidor-service";
import {HorarioProfesorPage} from "../pages/horario-profesor/horario-profesor";
import{HorarioProfesorNuevo}  from "../pages/horario-profesor-nuevo/horario-profesor-nuevo";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';



const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'b4b52114',
  },
  'push': {
    'sender_id': '537355903605',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};




@NgModule({
  declarations: [
    MyApp,
    CalendarioEstudiantePage,
    CalendarioProfesorPage,
    CancelarCitasPage,
    ConfiguracionEstudiantePage,
    ConfiguracionProfesorPage,
    InicioPage,
    IntroPage,
    ProgramarCitaPage,
    RegistroPage,
    RegistroProfesorPage,
    RegistroEstudiantePage,
    SesionEstudiantePage,
    SesionProfesorPage,
    HorarioProfesorPage,
    HorarioProfesorNuevo
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings) 
  ],
  bootstrap: [IonicApp],

  entryComponents: [
    MyApp,
    CalendarioEstudiantePage,
    CalendarioProfesorPage,
    CancelarCitasPage,
    ConfiguracionEstudiantePage,
    ConfiguracionProfesorPage,
    InicioPage,
    IntroPage,
    ProgramarCitaPage,
    RegistroPage,
    RegistroProfesorPage,
    RegistroEstudiantePage,
    SesionEstudiantePage,
    SesionProfesorPage,
    HorarioProfesorPage,
    HorarioProfesorNuevo

  ],
  providers: [ConexionesREST,Storage,StorageProvider]
})
export class AppModule {}
