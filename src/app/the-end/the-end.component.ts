import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../storage.service';
import { Http } from '@angular/http';

const store = new StorageService();

@Component({
  selector: 'app-the-end',
  templateUrl: './the-end.component.html',
  styleUrls: ['./the-end.component.scss']
})
export class TheEndComponent implements OnInit {
  

  results = window['activeSession'];
  jobRoles = [];
  bestMatch = 'developer';

  jobListTitle = 'Careers at Dyson';
  interestedTitle = 'Interested?';

  constructor(private http:Http) { }
  username = localStorage.getItem('anna-username')||'demo'
  ngOnInit() {

    if(window['activeSession']){
      this.bestMatch = window['activeSession'].score.bestMatch;
    }

    this.http.get('/assets/jobs.json').subscribe((data:any)=>{
      this.jobRoles = JSON.parse(data._body);
    })

  }

  emailMeBtnText = 'Email me later';
  
  email:null;

  saveForm(form){
    this.emailMeBtnText = 'Thanks!';
    if(store.getActiveSession){
      console.log('got', form.email);
      store.getActiveSession.email = form.email;
      store.updateEmail();
      console.log(store.getActiveSession)
    }
    else{
      console.log('No session in progress, cannot save email.' , form)
    }
    //store.updateEmail();
  }

}
