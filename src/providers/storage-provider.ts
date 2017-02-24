import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';



@Injectable()
export class StorageProvider {
    local: any;
  constructor() {
      this.local= new Storage();
  }

  saveData(key : string, data : String){
      this.local.set(key,data);
  }

  getData(key : string){
    this.local.get(key).then((name) => {
    console.log('Your name is', name);
    });        
  }

  clearData(key :string){
      this.local.remove(key).then( ()=>{ console.log("se eliminó " + key)} );
  }


}
