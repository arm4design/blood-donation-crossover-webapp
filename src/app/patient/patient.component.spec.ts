import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PatientComponent } from './patient.component';
import { MapComponent } from '../map/map.component';

describe('PatientComponent', () => {

    let comp: PatientComponent;
    let fixture: ComponentFixture<PatientComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                PatientComponent,
                MapComponent
            ]
        });
        TestBed.compileComponents();

        fixture = TestBed.createComponent(PatientComponent);

        comp = fixture.componentInstance;
  });

  it('should create the component', async(() => {
      expect(comp).toBeTruthy();
  }));

  it('should have mapType set to "patient"', async(() => {
      expect(comp.mapType).toBe('patient');
  }));

  it('should have all required elements in template', async(() => {
      let de: DebugElement;
      let el: HTMLElement;

      de = fixture.debugElement.query(By.css('map'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);
  }));

});
