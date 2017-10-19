import { Component, OnInit, Input } from '@angular/core';

interface Role{
  role:string;
  about:string;
  available:any[]
}

@Component({
  selector: 'app-job-accordian',
  templateUrl: './job-accordian.component.html',
  styleUrls: ['./job-accordian.component.scss']
})
export class JobAccordianComponent implements OnInit {

  @Input() roleData:Role;
  constructor() { }

  ngOnInit() {
    console.log(this.roleData)
  }

}
