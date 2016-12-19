import { Directive, Component, AfterViewInit, Input, Output, EventEmitter, Renderer, OnChanges } from '@angular/core';
import { EsriLoaderService } from 'angular2-esri-loader';
import { Subscription } from 'rxjs/Subscription';
import * as io from 'socket.io-client';
import { AppConfig } from '../app.config';

@Component({
    selector: 'map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    providers: [EsriLoaderService]
})
export class MapComponent implements AfterViewInit {
    @Input() mapType: string;
    @Input() clearMapGraphics: boolean;
    @Output() onDonorAdded = new EventEmitter<any>();
    private map: any;
    private position: any;
    public subscription: Subscription;
    public donors: any = {};
    readonly SOCKET_URL: string = AppConfig.WEBSERVICE;
    private socket;

    constructor(private esriLoader: EsriLoaderService, private renderer: Renderer) {
        this.socket = io.connect(this.SOCKET_URL);
    }

    ngAfterViewInit() {
        if ('geolocation' in navigator)
            navigator.geolocation.getCurrentPosition(position => {
                this.position = [position.coords.longitude, position.coords.latitude];
                this.loadMap();
            });
        else
            this.loadMap();
    }

    ngOnChanges() {
        if (this.clearMapGraphics)
            this.map.graphics.clear();
    }

    private loadMap() {
        return this.esriLoader.load({
            url: '//js.arcgis.com/3.18/'
        }).then(() => {
            this.esriLoader.loadModules([
                'esri/map',
                'esri/dijit/Search',
                'esri/dijit/LocateButton',
                'esri/symbols/SimpleMarkerSymbol',
                'esri/symbols/SimpleLineSymbol',
                'esri/symbols/SimpleFillSymbol',
                'esri/InfoTemplate',
                'esri/graphic',
                'esri/Color',
                // 'esri/geometry/geometryEngineAsync',
                'esri/geometry/Polygon',
                'esri/geometry/Point',
                // 'esri/geometry/screenUtils'
            ]).then(([Map, Search, LocateButton, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, InfoTemplate, Graphic, Color, Polygon, Point]) => {
                let map = new Map(document.querySelector('.esri4-map'), {
                    center: this.position ? this.position : [-118, 34.5],
                    zoom: 16,
                    basemap: 'topo'
                });
                this.map = map;

                let search = new Search({
                    map: map
                }, document.querySelector('.esri4MapSearch'));
                search.startup();

                let geoLocate = new LocateButton({
                    map: map
                }, document.querySelector('.esri4MapLocate'));
                geoLocate.startup();

                let donorSymbol = new SimpleMarkerSymbol();
                donorSymbol.setPath('M 362.158 21.082 c -38.791 0 -77.1 14.983 -106.148 40.855 c -29.059 -25.869 -67.374 -40.855 -106.151 -40.855 C 65.824 21.082 0 86.906 0 170.935 C 0 273.262 71.857 336.34 180.626 431.82 c 9.359 8.216 19.018 16.697 28.958 25.484 c 0.058 0.051 0.117 0.102 0.176 0.154 l 33.042 28.545 c 3.793 3.278 8.502 4.915 13.212 4.915 c 4.709 0 9.418 -1.638 13.212 -4.915 l 33.042 -28.545 c 0.059 -0.051 0.119 -0.102 0.178 -0.155 c 65.298 -57.75 114.249 -101.953 149.574 -144.954 C 492.94 262.535 512 217.598 512 170.935 C 512 86.906 446.181 21.082 362.158 21.082 Z');
                donorSymbol.setColor(new Color('#612d62'));

                map.on('extent-change', (event: any) => {
                    if (this.mapType === 'patient'){
                        let polygon = Polygon.fromExtent(map.geographicExtent);
                        this.socket.emit('donors in zone', polygon.rings);
                    }
                });

                map.on('click', (event: any) => {
                    if (this.mapType === 'donor') {
                        map.graphics.clear();
                        addDonor(event.mapPoint, event.screenPoint);
                        this.onDonorAdded.emit([event.mapPoint.getLongitude(), event.mapPoint.getLatitude()]);
                    } else if (this.mapType === 'patient'){
                        showDonorInfo(event.graphic, event.screenPoint, this.renderer);
                    }
                });

                this.socket.on('donors', (data: any) => {
                    this.donors = data;
                    for (let donor of data) {
                        let geometry = new Point(donor.geo.coordinates[0], donor.geo.coordinates[1]);
                        let screenPoint = map.toScreen(geometry);
                        addDonor(geometry, screenPoint, donor);
                    }
                });

                function addDonor(geometry: any, screenPoint: any, attributes?: any) {
                    let graphic;

                    if (attributes)
                        graphic = new Graphic(geometry, donorSymbol, attributes);
                    else
                        graphic = new Graphic(geometry, donorSymbol);

                    map.graphics.add(graphic);
                };

                function showDonorInfo(graphic: any, screenPoint: any, renderer: Renderer) {
                    graphic.setInfoTemplate(new InfoTemplate('Donor',
                        '<span>First Name: '+ graphic.attributes.firstName +'</span><br>' +
                        '<span>Last Name: '+ graphic.attributes.lastName +'</span><br>' +
                        '<span>Contact Number: <span id="showContactNumber" class="data-hidden">Click here to show contact number</span></span><br>' +
                        '<span>Email Address: <span id="showEmailAddress" class="data-hidden">Click here to show email address</span></span><br>' +
                        '<span>Blood Group: '+ graphic.attributes.bloodGroup +'</span><br>'));
                    map.infoWindow.setTitle(graphic.getTitle());
                    map.infoWindow.setContent(graphic.getContent());
                    map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
                    renderer.listen(document.querySelector('#showContactNumber'), 'click', (e) => {
                        e.target.textContent = graphic.attributes.contactNumber;
                        e.target.className = e.target.className.replace('data-hidden', '');
                    });
                    renderer.listen(document.querySelector('#showEmailAddress'), 'click', (e) => {
                        e.target.textContent = graphic.attributes.emailAddress;
                        e.target.className = e.target.className.replace('data-hidden', '');
                    });
                };

                function coordsToScreen(coords: any) {
                    return map.toScreen(coords);
                };

                function getCenter() {
                    return map.toMap({ x: map.width/2, y: map.height/2 });
                };

                function getArea() {
                    let area = new Polygon(map.spatialReference);
                    // let symbol = new SimpleFillSymbol(
                    //     SimpleFillSymbol.STYLE_NULL,
                    //     new SimpleLineSymbol(
                    //         SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
                    //         new Color([105, 105, 105]),
                    //         2
                    //     ),
                    //     new Color([255, 255, 0, 0.25])
                    // );
                    //
                    // let graphic = new Graphic(area, symbol);
                    // map.graphics.add(graphic);
                    //
                    // console.log(area.getExtent());
                    return area;
                };

            });
        });
    }

}
