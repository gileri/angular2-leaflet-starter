/// <reference path="../../typings/leaflet/leaflet.d.ts"/>

import {Injectable} from 'angular2/core';
import {Location} from '../core/location.class';
import {Map, TileLayer} from 'leaflet';

@Injectable()
export class MapService {
    map: Map;
    baseMaps: any;

    constructor() {
        this.baseMaps = {
            OpenStreetMap: new L.TileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="https://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
            }),
            Esri: new L.TileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
               attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
            }),
            CartoDB: new L.TileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
               attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
            })
        };
    }

    disableMouseEvent(tag: string) {
        var html = L.DomUtil.get(tag);

        L.DomEvent.disableClickPropagation(html);
        L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
    };
}
