import { Injectable } from '@angular/core';
import {  AppearanceService } from './appearance.service';

@Injectable()
export class LightingService {

  width:number;
  height:number;
  
  angleFromPointLight(style:any = {left:0,top:0}){
    
    this.width = AppearanceService.publicAvatar.size;
    this.height = AppearanceService.publicAvatar.size;

    let x = parseInt(style.left);
    let y = parseInt(style.top);
    const p1 = {
      x: x + this.width / 2,
      y: y + this.height / 2
    };
    
    const p2 = {
      x: (window.innerWidth / 2),
      y: (window.innerHeight / 2)
    };
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;	
  }
  
  distanceFromPointLight(style){
    const target = <HTMLElement>document.querySelector("#move-wrapper")
    const center = {
      x: (window.innerWidth / 2),
      y: (window.innerHeight / 2)
    };
    
    const coordinates:any = target.getBoundingClientRect()
    const elLeftFromCenter = parseInt(coordinates.left) + (this.width / 2) 
    let n:number = Math.abs(center.x - elLeftFromCenter)
    let p = Math.floor( ( n / center.x) * 100) +'%';
    
    let asFloat =  parseFloat(p) / 100.0;
    let elements = document.querySelectorAll('.rim-lighting');
    Array.prototype.forEach.call(elements, function(el, i){
      el.style.opacity = 1 - asFloat;
    });
    
  }
  
  applyLighting(angle = 0){
    let transforms = [
      "rotate("+angle+"deg)"
    ].join(" ")
    
    var elements = document.querySelectorAll('.rim-lighting');
    Array.prototype.forEach.call(elements, function(el, i){
      el.style.transform = transforms;
      el.style.transformOrigin = "center";
    });  
  }
  //init
  //applyLighting(angleFromPointLight(target.style))
  
  init() {
    const target = <HTMLElement>document.querySelector("#move-wrapper")
    const self = this;
    this.width = target.clientWidth;
    this.height = target.clientHeight;
    
    // create an observer instance
    let observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation)=> {
        const isAttributes = mutation.type === "attributes";
        const isStyle = mutation.attributeName === "style";
        if(isAttributes && isStyle){
          const coordinates = target.getBoundingClientRect()
          self.applyLighting( self.angleFromPointLight(coordinates))
          self.distanceFromPointLight( coordinates )
        }
      });
    });
  
    // configuration of the observer:
    const config = {
      attributes: true,
      childList: true,
      characterData: true
    };
  
    // pass in the target node, as well as the observer options
    observer.observe(target, config);
  
    this.applyLighting( this.angleFromPointLight(target.style))
  }

}
