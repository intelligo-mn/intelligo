import { LazyMapsAPILoaderConfigLiteral } from "@agm/core";
import { Injectable } from "@angular/core";
import { UtilitiesService } from "../services/utilities.service";

@Injectable()
export class GoogleMapsConfig implements LazyMapsAPILoaderConfigLiteral {
  constructor(utils: UtilitiesService) {
    UtilitiesService.googleMapsConfigRef = this;
  }
  apiKey: string;
}
