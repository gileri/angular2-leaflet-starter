import {Http, Headers, Response} from 'angular2/http';
import {Location} from '../core/location.class';
import {Injectable} from 'angular2/core';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class GeocodingService {
    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    geocode(address: string) {
        return this.http
            .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(address))
            .map(res => res.json())
            .map(result => {
                if(result.status != 'OK') { throw new Error('unable to geocode address'); }

                var location = new Location();
                location.address = result.results[0].formatted_address;
                location.latitude = result.results[0].geometry.location.lat;
                location.longitude = result.results[0].geometry.location.lng;

                return location;
            });
    }

    getCurrentLocation() {
        return this.http
            .get('https://freegeoip.net/json/')
            .map((res: Response) => res.json())
            .map(result => {
                var location = new Location();
                location.address = result.city + ', ' + result.region_code + ' ' + result.zip_code + ', ' + result.country_code;
                location.latitude = result.latitude;
                location.longitude = result.longitude;

                return location;
            });
    }
}
