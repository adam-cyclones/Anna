import { Injectable } from '@angular/core';
import * as anime from "animejs";
import {randomIntClamp} from "./random.utils";
import { AppearanceService } from './appearance.service';


interface DistanceRecomend{
	name:string,
	use
}

function rateDistance(n):DistanceRecomend{
	let rating;
	n = Math.round(n);

	if(n >= 0){
		rating = {
			use: 1000,
			name:'v-short'
		};
	}
	if(n > 200){
		rating = {
			use: 1000,
			name:'short'
		};
	}
	if(n > 400){
		rating = {
			use: 1200,
			name:'medium'
		};
	}
	if(n > 500){
		rating = {
			use: 1500,
			name:'long'
		};
	}
	if(n > 600){
		rating = {
			use:1800,
			name:'v-long'
		};
	}

	return rating;
}

var cache = [];
class Bezier{
  cache = cache;
  selector:string;
  ns:string;
  target:Element;
  uid:number = 0;
	constructor(){
		let ns = "http://www.w3.org/2000/svg"; 
		this.ns = ns;
		this.selector = "generated"
		let svg = document.createElementNS (ns, "svg");
		svg.setAttribute("id",this.selector);
		this.selector = "#"+this.selector;
		svg.setAttribute("height", window.innerHeight.toString());
		svg.setAttribute("width", window.innerWidth.toString());
		document.body.appendChild(svg);
		this.target = document.querySelector(this.selector);
	}
	draw(draw){
		let oldPath = this.target.querySelector("path");
		if(oldPath){
			//start at the end of the last
			let d = oldPath.getAttribute("d").split(" ").pop().split(",")
			cache.shift()
			let followOn = {
				start:{
					top:parseInt(d[1]),
					left:parseInt(d[0])
				},
				end:draw.end
			} 
			cache.push(followOn);
			return this.perfectCurve(followOn);
		}
		else{//first run
			cache.push(draw);
			return this.perfectCurve(draw);
		}
		
	}
	perfectCurve(draw){
    this.uid++;
    let oldPath = this.target.querySelector("path");
		if(oldPath){
			 this.target.removeChild(oldPath)
		}
		let path = document.createElementNS(this.ns, "path");
		let threshold = draw.end.top > (innerHeight / 2);
		
		let dir:"up"|"down" = threshold? "up":"down";
    let ctrl2 = dir === "up"? `${draw.start.left},${draw.end.top}`:`${draw.end.left},${draw.start.top}`;
		let dirX = draw.start.left > draw.end.left?'left':'right';
		path.setAttribute('id','mp-'+this.uid);
    path.setAttributeNS(null, "d", `M${draw.start.left},${draw.start.top} Q${ctrl2} ${draw.end.left},${draw.end.top}`);
		const pathLen = (path as any).getTotalLength();
		this.target.appendChild( path );
		return {
			distance:pathLen,
			directionY:dir,
			directionX:dirX
		};
	}
}

//expose our curve as a dependency
let b = new Bezier()

//The shit that counts
interface Coordinate{
  top:number,
  left:number
}

@Injectable()
export class MovementService{
  
  	get wrapper(){
		return document.querySelector('#avatar-size') as Element;
	}
	public bezier = b;
	

	public rateSpeed(n){

	}

	public async fromTo(coordinateStart?:Coordinate, coordinateEnd?:Coordinate, speed?:number, callback?:Function){
		const pathInfo = this.bezier.draw({
			start:coordinateStart,
			end:coordinateEnd
		})
		let path = anime.path('#generated path');
		return new Promise(resolve=>{
			anime({
				targets: '#move-wrapper',
				translateX: path('x'),
				translateY: path('y'),
				duration: speed || rateDistance( pathInfo.distance ).use,
				loop: false,
				elasticity: 300,
				easing: "easeOutElastic",
				complete(){
					if(callback){
						callback();
					}
					resolve();
				}
			});
		});
	}

  public async to(coordinate?:Coordinate, speed?:number){

		if(!coordinate){
			coordinate = <Coordinate>{
				top:window.innerWidth / 2,
				left:window.innerHeight / 2
			}
		}
		let wrapperCoordianate = this.wrapper.getBoundingClientRect();
		
		let pathInfo = this.bezier.draw({
			start:{
				top:wrapperCoordianate.top||0,
				left:wrapperCoordianate.left||0
			},
			end:coordinate
		})
		
		let path = anime.path('#generated path');
		
		return new Promise(resolve=>{

			anime({
				targets: '#move-wrapper',
				translateX: path('x'),
				translateY: path('y'),
				angle:path('angle'),
				duration: speed || rateDistance(pathInfo.distance).use,
				loop: false,
				elasticity:300,
				easing:'easeOutElastic',
				complete:()=>{
					
					resolve();
				}
			});
		});
	}
	
	public async rotate(angle,speed){
		let wrapperCoordianate = this.wrapper.getBoundingClientRect();
		
		let pathInfo = {
			top:wrapperCoordianate.top||0,
			left:wrapperCoordianate.left||0
		}
		return await new Promise(resolve =>{
			anime({
				translateY:pathInfo.top,
				translateX:pathInfo.left,
				targets: '#eyes',
				loop: false,
				elasticity:300,
				easing:'easeOutElastic',
				rotate:angle,
				complete:()=>{
					resolve();
				}
			});
		});
	}

	public async toElement(selector:string, alignTo:'top'|'left'|'right'|'bottom', speed?:number){
		
		let wrapperCoordianate = this.wrapper.getBoundingClientRect();
		let toTarget = <Element>document.querySelector(selector);
		let targetCoordinate = toTarget.getBoundingClientRect();
		let end:Coordinate;

		if(alignTo === 'top'){
			end = {
				top:targetCoordinate.top - AppearanceService.publicAvatar.size,
				left:targetCoordinate.left + (targetCoordinate.width / 2) - (AppearanceService.publicAvatar.size / 2)
			}
		}

		if(alignTo === 'left'){
			end = {
				top:targetCoordinate.top + (targetCoordinate.height / 2) - (AppearanceService.publicAvatar.size / 2),
				left:targetCoordinate.left - AppearanceService.publicAvatar.size
			}
		}

		if(alignTo === 'right'){
			end = {
				top:targetCoordinate.top + (targetCoordinate.height / 2) - (AppearanceService.publicAvatar.size / 2),
				left:targetCoordinate.right
			}
		}

		if(alignTo === 'bottom'){
			end = {
				top:targetCoordinate.bottom + 5,
				left:targetCoordinate.left + (targetCoordinate.width / 2) - (AppearanceService.publicAvatar.size / 2)
			}
		}

		let pathInfo = this.bezier.draw({
			start:{
				top:wrapperCoordianate.top||0,
				left:wrapperCoordianate.left||0
			},
			end:end
		})
		
		let path = anime.path('#generated path');
		
		return new Promise(resolve=>{

			anime({
				targets: '#move-wrapper',
				translateX: path('x'),
				translateY: path('y'),
				easing: 'linear',
				duration: speed || rateDistance(pathInfo.distance).use,
				loop: false,
				elasticity:100,
				easeing:'easeOutElastic',
				complete:()=>{
					console.log( 'speed of', rateDistance( pathInfo.distance ).use, rateDistance( pathInfo.distance ).name )
					resolve();
				}
			});
		});
	}
  
}
