import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { DonorDetailComponent } from './donor.component.detail';
import { MapComponent } from '../map/map.component';
import { DonorService } from './donor.service';
import { DonorComponent } from './donor.component';
import { Donor } from './donor.interface';
import { HttpService } from '../app.service.http';

const fakeSubscribe = () => {
    return {
        response: {
            status: 'success',
            message: 'ok'
        },
        error: {
            status: 'error',
            message: 'fail',
            errorMessage: 'fail'
        }
    };
};

const fakeUserInfo: any = {
    ip: '1.1.1.1',
    country: 'country',
    city: 'city',
    region: 'region',
    zipCode: 11111,
};

describe('DonorDetailComponent', () => {

    let comp: DonorDetailComponent;
    let fixture: ComponentFixture<DonorDetailComponent>;
    let service: any;
    let spy: any;
    let donorServiceStub = {
        getUserInfo: () => {
            return {
                subscribe: () => {
                    return fakeSubscribe;
                }
            }
        },
        postSubscription: () => {
            return {
                subscribe: () => {
                    return fakeSubscribe;
                }
            }
        }
    };
    let httpServiceStub = {
        get: () => {
            return {
                subscribe: () => {
                    return {};
                }
            }
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DonorDetailComponent,
                MapComponent
            ],
            providers: [
                {provide: DonorService, useValue: donorServiceStub},
                {provide: HttpService, useValue: httpServiceStub}
            ],
            imports: [FormsModule]
        });
        TestBed.compileComponents();

        fixture = TestBed.createComponent(DonorDetailComponent);

        comp = fixture.componentInstance;
        service = fixture.debugElement.injector.get(DonorService);
  });

  it('should create the component', async(() => {
      expect(comp).toBeTruthy();
  }));

  it('should have all required elements in template', async(() => {
      let de: DebugElement;
      let el: HTMLElement;

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);
  }));

});
