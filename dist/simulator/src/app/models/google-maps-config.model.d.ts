import { LazyMapsAPILoaderConfigLiteral } from '@agm/core';
import { UtilitiesService } from '../services/utilities.service';
export declare class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
    constructor(utils: UtilitiesService);
    apiKey: string;
}
