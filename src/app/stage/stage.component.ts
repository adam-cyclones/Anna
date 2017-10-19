import { Component, OnInit, state, style, animate, transition, trigger } from '@angular/core';
import { StepsService } from '../steps.service';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
  providers:[
    StepsService
  ],
  animations:[
    trigger('fadeInOut', [
      transition(':enter', [   // :enter is alias to 'void => *'
        style({opacity:0}),
        animate(500, style({opacity:1})) 
      ]),
      transition(':leave', [   // :leave is alias to '* => void'
        animate(500, style({opacity:0})) 
      ])
    ])
  ]
})
export class StageComponent implements OnInit {

  constructor(private timeline:StepsService) { }

  inputType:string = 'text';
  inputPlaceholder:string = 'say your name or type it here..';

  

  speech:string;
  ngOnInit() {
  }

  startRecruitment(){
    this.timeline.idle = false;
    console.log('Starting recruitment program.')
  }


  inputClear(e){
    const target:HTMLElement = e.target;
    target.setAttribute('value','');
  }
  inputSubmit(data,e){
    e.preventDefault();
    console.log('submit')
  }
}
