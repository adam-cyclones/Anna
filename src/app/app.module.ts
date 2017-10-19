import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {  } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { StageComponent } from './stage/stage.component';
import { DataComponent } from './data/data.component';
import { TheEndComponent } from './the-end/the-end.component';
import { JobAccordianComponent } from './job-accordian/job-accordian.component';

const appRoutes: Routes = [
  { path: 'data', component: DataComponent },
  { path: 'jobs', component: TheEndComponent},
  { path: '**', component: StageComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    StageComponent,
    DataComponent,
    TheEndComponent,
    JobAccordianComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
