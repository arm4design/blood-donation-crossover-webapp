import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { DonorNewComponent } from './donor.component.new';
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

describe('DonorNewComponent', () => {

    let comp: DonorNewComponent;
    let fixture: ComponentFixture<DonorNewComponent>;
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
                subscribe: fakeSubscribe
            }
        }
    };
    let httpServiceStub = {
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                DonorNewComponent,
                MapComponent
            ],
            providers: [
                {provide: DonorService, useValue: donorServiceStub},
                {provide: HttpService, useValue: httpServiceStub}
            ],
            imports: [FormsModule]
        });
        TestBed.compileComponents();

        fixture = TestBed.createComponent(DonorNewComponent);

        comp = fixture.componentInstance;
        service = fixture.debugElement.injector.get(DonorService);
  });

  it('should create the component', async(() => {
      expect(comp).toBeTruthy();
  }));

  it('should have mapType set to "donor"', async(() => {
      expect(comp.mapType).toBe('donor');
  }));

  it('should have all required elements in template', async(() => {
      let de: DebugElement;
      let el: HTMLElement;

      de = fixture.debugElement.query(By.css('map'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);

      de = fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);
  }));

});
