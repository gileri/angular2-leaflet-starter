/// <reference path="../../../typings/leaflet/leaflet.d.ts"/>

import {Component, View, ViewChild, Renderer} from 'angular2/core';
import {NavigatorComponent} from '../navigator/navigator.component';
import {MarkerComponent} from '../marker/marker.component';
import {Location} from '../../core/location.class';
import {MapService, GeocodingService, ModalService} from '../../services/services';
import {Modal} from '../../../node_modules/angular2-modal/dist/angular2-modal';

@Component({
    selector: 'app',
    providers: [ModalService, Modal, Renderer]
})
@View({
    template: require('./app.component.html'),
    styles: [
        require('./app.component.less')
    ],
    directives: [NavigatorComponent, MarkerComponent]
})
export class AppComponent {
    private mapService: MapService;
    private geocoder: GeocodingService;
    private modal: ModalService;

    @ViewChild(MarkerComponent) markerComponent:MarkerComponent;

    constructor(mapService: MapService, geocoder: GeocodingService, modal: ModalService) {
        this.mapService = mapService;
        this.geocoder = geocoder;
        this.modal = modal;
    }

    ngOnInit() {
        this.modal.showAbout();

        var map = new L.Map('map', {
          zoomControl: false,
          center: new L.LatLng(40.731253, -73.996139),
          zoom: 12,
          minZoom: 4,
          maxZoom: 19,
          layers: [this.mapService.baseMaps.OpenStreetMap]
        });

        L.control.zoom({ position: 'topright' }).addTo(map);
        L.control.layers(this.mapService.baseMaps).addTo(map);
        L.control.scale().addTo(map);

        this.mapService.map = map;

        this.geocoder.getCurrentLocation()
        .subscribe(
            location => map.panTo([location.latitude, location.longitude]),
            err => console.error(err)
        );
    }

    ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}
