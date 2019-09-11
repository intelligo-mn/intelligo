import { Injectable } from '@angular/core';
import { LazyMapsAPILoader, LAZY_MAPS_API_CONFIG, LazyMapsAPILoaderConfigLiteral } from '@agm/core';
import { UtilitiesService } from '../services/utilities.service';

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
    constructor(utils: UtilitiesService) {
        UtilitiesService.googleMapsConfigRef = this;
    }
    apiKey: string;
}
