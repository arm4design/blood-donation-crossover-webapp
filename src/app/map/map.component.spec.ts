import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapComponent } from './map.component';
import { HttpService } from '../app.service.http';

describe('MapComponent', () => {

    let comp: MapComponent;
    let fixture: ComponentFixture<MapComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                MapComponent
            ],
            providers: [
                HttpService
            ]
        });
        TestBed.compileComponents();

        fixture = TestBed.createComponent(MapComponent);

        comp = fixture.componentInstance;
  });

  it('should create the component', async(() => {
     expect(comp).toBeTruthy();
  }));

  it('should have undefined mapType', async(() => {
      fixture.detectChanges()
      expect(comp.mapType).toBe(undefined);
  }));

  it('should have all required elements in template', async(() => {
      let de: DebugElement;
      let el: HTMLElement;

      de = fixture.debugElement.query(By.css('.esri4-map'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);

      de = fixture.debugElement.query(By.css('.esri4MapSearch'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);

      de = fixture.debugElement.query(By.css('.esri4MapLocate'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);
  }));

});
