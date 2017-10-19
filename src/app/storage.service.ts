import { Injectable } from '@angular/core';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

interface SessionStorage{
  guid:string,
  name:string,
  email:string,
  score:{
    bestMatch:string,
    all:any
  }
}

@Injectable()
export class StorageService {

  record:string;
  today;
  activeSession:SessionStorage;
  constructor() {
    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1
    this.record = 'anna-'+day+'-'+month;
    this.today = <string>localStorage.getItem(this.record);
  }

  startSession(){
    this.activeSession = {
      guid:guid(),
      name:null,
      email:null,
      score:{
        bestMatch:null,
        all:{}
      }
    }
    window['activeSession'] = this.activeSession;
    return this.activeSession;
  }

  get getActiveSession(){
    return window['activeSession'];
  }

  logSession(){
    console.log(this.activeSession);
  }

  updateEmail(){
    let currentStorageSet:any = <string>localStorage.getItem(this.record)
    let data = JSON.parse(currentStorageSet);
    let newRecord = data.find(item=>item.guid === this.getActiveSession.guid).email = this.getActiveSession.email;

    data.filter(item=> item.guid !== this.getActiveSession.guid).push(newRecord);

    console.log(data)

    localStorage.setItem(this.record, JSON.stringify(data))
  }

  persist(){
    console.log('Chalking up results')
    let currentStorageSet:any = <string>localStorage.getItem(this.record);
    let newRecord = this.activeSession;
    
    //now an array of objects
    currentStorageSet = JSON.parse(currentStorageSet);
    currentStorageSet.push(newRecord)
    localStorage.setItem(this.record,JSON.stringify(currentStorageSet));

  }

}
