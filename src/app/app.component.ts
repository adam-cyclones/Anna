import { Component } from '@angular/core';
import { AppearanceService } from "./appearance.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[
    AppearanceService
  ]
})
export class AppComponent {
  constructor(
    private appearance:AppearanceService
  ){

    const currentDate = new Date()
    const day = currentDate.getDate()
    const month = currentDate.getMonth() + 1

    const prev = JSON.parse( localStorage.getItem('anna-'+day+'-'+month)||'[]' )
    localStorage.setItem('anna-'+day+'-'+month,JSON.stringify( prev.concat([]) ))
  }


}
