import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { MapComponent } from '../map/map.component';

describe('HomeComponent', () => {

    let comp: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                HomeComponent,
                MapComponent
            ]
        });
        TestBed.compileComponents();

        fixture = TestBed.createComponent(HomeComponent);

        comp = fixture.componentInstance;
  });

  it('should create the component', async(() => {
      expect(comp).toBeTruthy();
  }));

  it('should have all required elements in template', async(() => {
      let de: DebugElement;
      let el: HTMLElement;

      de = fixture.debugElement.query(By.css('map'));
      el = de.nativeElement;
      expect(el).not.toBe(undefined);
  }));

});
