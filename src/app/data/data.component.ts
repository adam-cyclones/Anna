import { Component, OnInit } from '@angular/core';
import {StorageService} from '../storage.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
  providers:[
    StorageService
  ]
})
export class DataComponent implements OnInit {

  annaData:any = [];
  constructor(private store:StorageService) { }

  ngOnInit() {
    const shitAuth = prompt("Enter Password : ");

    if(shitAuth === 'dccat'){
      console.log('unlocked')
      const data = JSON.parse(localStorage.getItem(this.store.record));
      console.log(data)
      this.annaData = data;
    }
    else{
      window.location.href = window.location.origin;
    } 
  }

  flush(){
    this.annaData = []
    window.localStorage.removeItem(this.store.record);
  }

  delete(guid){
    const data = JSON.parse(localStorage.getItem(this.store.record)).filter((record)=>record.guid !== guid);
    localStorage.setItem(this.store.record,JSON.stringify(data));
    this.annaData = data;
  }

  refresh(){
    const data = JSON.parse(localStorage.getItem(this.store.record));
    console.log(data)
    this.annaData = data;
  }

  private download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
  }

  downloadJSON(){
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    const today = 'anna-'+day+'-'+month;

    this.download(today+'.json', JSON.stringify( JSON.parse( localStorage.getItem(today) ), null, '\t' ));
  }


}
