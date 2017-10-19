import { Component, OnInit } from '@angular/core';
import { AppearanceService } from "../appearance.service";
import { EmotionService } from "../emotion.service";
import { MovementService } from "../movement.service";
import { LightingService } from "../lighting.service";
import { StepsService } from "../steps.service";
import { randomIntClamp } from "../random.utils";
//sadly gsap is not very compatible with typescript
import * as anime from "animejs";


interface Coordinate{
  top:number,
  left:number
}

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  providers:[
    AppearanceService,
    EmotionService,
    MovementService,
    LightingService,
    StepsService
  ]
})
export class AvatarComponent implements OnInit {

  constructor(
    private appearance:AppearanceService,
    private emotion:EmotionService,
    private moves:MovementService,
    private lighting:LightingService,
    private timeline:StepsService
  ) {}
  
  
  async ngOnInit() {



    //Sets the point lighting
    this.lighting.init()
    //Sets the intial positon
    const intialPosition:Coordinate = <Coordinate>await this.appearance.initialPosition()
    
    //Sets the initial emotion
    this.appearance.initialEmotion()

    await this.emotion.setEyeShape({
      eyeSelector:'both',
      shape:'circle',
      speed:300,
      transforms:{
        scale:.1,
        morphPrecision: 4,
        reverseFirstPath: true,
        easing: 'easingCubicInOut'
      }
    });

    //Required
    await this.moves.fromTo({
      top:-(innerWidth),
      left:intialPosition.left
    },{
      top:(document.querySelector('#path-disk').getBoundingClientRect().top / 2) - 68,
      left:intialPosition.left
    },400, async ()=>{
      //after landing
      await this.emotion.setEyeShape({
        eyeSelector:'both',
        shape:'circle',
        speed:300,
        transforms:{
          scale:.1,
          morphPrecision: 4,
          reverseFirstPath: true,
          easing: 'easingCubicInOut'
        }
      });


    const blinkIntervals = [
      2000,
      5000,
      10000,
      15000,
      20000
    ];
    (function loop() {
      if(this.emotion.allowBlinks){
        let rand = blinkIntervals[randomIntClamp(0, blinkIntervals.length - 1)];
        setTimeout(()=> {
          this.emotion.blink()
          loop.bind(this)();  
        }, rand);
      }
    }).bind(this)();

    });

    await this.emotion.setEyeShape({
      eyeSelector:'both',
      shape:'circle',
      speed:300,
      transforms:{
        delay:3000,
        scale:1,
        morphPrecision: 4,
        reverseFirstPath: true,
        easing: 'easingCubicInOut'
      }
    });


    await this.moves.toElement('#path-disk', 'top');
    await this.moves.toElement('#path-disk', 'left');
    
    
    
    await this.emotion.setEyeShape({
      eyeSelector:'both',
      shape:'circle',
      speed:300,
      transforms:{
        scale:1,
        morphPrecision: 4,
        reverseFirstPath: true,
      }
    });

    // await this.emotion.setEyeShape({
    //   eyeSelector:'random',
    //   shape:'circle',
    //   speed:2000,
    //   transforms:{
    //     scale:.1,
    //     transformOrigin:'center',
    //   }
    // });

    // await this.emotion.resetEye('both');
    
    // await this.emotion.setEyeShape({
    //   eyeSelector:'random',
    //   shape:'heart',
    //   speed:300,
    //   transforms:{
    //     scale:1,
    //     transformOrigin:'center',
    //   }
    // });

  }

}
