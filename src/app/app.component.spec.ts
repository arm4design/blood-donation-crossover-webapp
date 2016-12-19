/* tslint:disable:no-unused-variable */

import { Directive, Input, Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DonorNewComponent } from './donor/donor.component.new';
import { DonorDetailComponent } from './donor/donor.component.detail';
import { PatientComponent } from './patient/patient.component';
import { MapComponent } from './map/map.component';

class MockRouter { public navigate() {}; }

@Directive({
  selector: '[routerLink]',
  host: {
    '(click)': 'onClick()'
  }
})
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                HomeComponent,
                DonorNewComponent,
                DonorDetailComponent,
                PatientComponent,
                MapComponent,
                RouterLinkStubDirective,
                RouterOutletStubComponent
            ],
            providers: [
                {provide: Router,  useClass: MockRouter },
            ],
            imports: [FormsModule]
        });
        TestBed.compileComponents();
    });

    it('should create the component', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should have as title "Blood Donation - Crossover"', async(() => {
        let fixture = TestBed.createComponent(AppComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Blood Donation - Crossover');
    }));

});
