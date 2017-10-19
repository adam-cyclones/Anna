import { Injectable } from '@angular/core';
import { randomIntClamp } from './random.utils';
import * as KUTE from 'kute.js';
import 'kute.js/kute-svg';
import 'kute.js/kute-css';
import 'kute.js/kute-attr';
import * as anime from "animejs";



let Elastic:any = window['Elastic'];


type EyeSelection = "left"|"right"|"both"|"random";
interface EyeShapes{
  heart:string;
  default:string;
  star:string;
  circle:string;
}


interface EyeShapeOptions{
  eyeSelector:EyeSelection;
  shape:"heart"|"default"|"star"|"circle";
  speed:number;
  transforms?:any;
}

@Injectable()
export class EmotionService {

  constructor() { }

  allowBlinks = true;

  private eyeShapes:EyeShapes = {
    default:'M95,25C95,14,86,5,75,5H25C14,5,5,14,5,25V75C5,86,14,95,25,95H75C86,95,95,86,95,75V25Z',
    heart:`M68.247,13.505C56.082,13.505,50,25.67,50,25.67S43.917,13.505000000000003,31.752,13.505000000000003C16.546,13.505000000000003,7.422000000000001,25.67,7.422000000000001,37.835C7.422000000000001,62.165,37.834,68.247,49.998999999999995,86.495C62.163999999999994,68.247,92.576,62.165000000000006,92.576,37.83500000000001C92.577,25.67,83.453,13.505,68.247,13.505Z`,
    star:`M50,72.765L23.583,86.652L28.628,57.235L7.255,36.404L36.792,32.112L50,5.348L63.211,32.112L92.744,36.404L71.373,57.235L76.418,86.652Z `,
    circle:`M95,50 C95,74.852813742395,74.852813742395,95,50,95,25.147186257605004,95,5,74.852813742395,5,50,5,25.147186257605004,25.147186257605004,5,50,5,74.852813742395,5,95,25.147186257605004,95,50z`
  }

  private availableEyes = [
    '#eye-left-emote-mask',
    '#eye-right-emote-mask'
  ]

  public getEyes(selection?:EyeSelection):string[]{
    if(selection === 'both' || selection === 'random' || !selection){
      if(selection && selection === 'both'){
        return this.availableEyes
      }
      else{
        //Pick an eye, any eye.
        let first = randomIntClamp(0,1);
        let last;
        if(first === 0){ last = 1; }
        else{last = 0}

        return [
          this.availableEyes[first],
          this.availableEyes[last]
        ]
      }
    }
    else {
      let use;
      const left = this.availableEyes[0];
      const right = this.availableEyes[1];
      if(selection === 'left'){
        use = left
      }
      else{
        use = right
      }
      return [ use ];
    }
  }


  setEyeShape(options:EyeShapeOptions){
    
    return new Promise(resolve=>{
      const targetEyes = this.getEyes(options.eyeSelector);
      for(let eye of targetEyes){
        KUTE.to(document.querySelector(eye), Object.assign({
          path: this.eyeShapes[options.shape],
        }, options.transforms),
        {
          duration:options.speed||3000,
          complete:()=>{
            resolve();
          }
        }
      ).start()
      }
    });

  }


  resetEye(selection?:EyeSelection){

    const targetEyes = this.getEyes(selection);
    return new Promise(resolve=>{
      for(let eye of targetEyes){
        KUTE.to(document.querySelector(eye), Object.assign({
          path: this.eyeShapes.default,
        }, {
          scale:1,
          rotate:0,
          skew:0,
        }),
        //Tween options object
        {
          complete:()=>{
            resolve();
          }
        }
      ).start()
      }
    });
  }

  async blink(selection:EyeSelection = 'both'){
    await new Promise(resolve=>{
      anime({
        targets:this.getEyes(selection),
        scaleY:.1,
        duration:300,
        easing:'easeOutElastic',
        complete(){
          resolve()
        }
      })
    })
    await new Promise(resolve=>{
      anime({
        targets:this.getEyes(selection),
        scaleY:1,
        duration:400,
        easing:'easeOutElastic',
        complete(){
          resolve()
        }
      })
    })
    return;
  }




}
