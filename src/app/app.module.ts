import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';
import './rxjs-operator';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DonorNewComponent } from './donor/donor.component.new';
import { DonorDetailComponent } from './donor/donor.component.detail';
import { PatientComponent } from './patient/patient.component';
import { MapComponent } from './map/map.component';

import { HttpService } from './app.service.http';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DonorNewComponent,
        DonorDetailComponent,
        PatientComponent,
        MapComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot([
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'donor',
                component: DonorNewComponent
            },
            {
                path: 'donor/:id',
                component: DonorDetailComponent
            },
            {
                path: 'patient',
                component: PatientComponent
            },
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            }
        ])
    ],
    providers: [
        HttpService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
