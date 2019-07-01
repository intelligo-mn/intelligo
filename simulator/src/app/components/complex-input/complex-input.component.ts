import * as agm from "@agm/core";
import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild
} from "@angular/core";
import {
  MatDatepicker,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material";
import {
  AddressInput,
  GeoLoc,
  IntelligoDate,
  IntelligoDateRange,
  IntelligoTime,
  ListItem
} from "../../models/chat.models";
import { UtilitiesService } from "../../services/utilities.service";

@Component({
  selector: "app-complex-input",
  templateUrl: "./complex-input.component.html",
  styleUrls: ["./complex-input.component.scss"]
})
export class ComplexInputComponent implements OnInit, AfterViewInit {
  constructor(
    public dialogRef: MatDialogRef<ComplexInputComponent>,
    @Inject(MAT_DIALOG_DATA) public params: ComplexInputParams
  ) {}

  ngOnInit() {
    if (this.params.Type == ComplexType.Location) {
      if (this.params.DefaultGeoLoc) this.geoLoc = this.params.DefaultGeoLoc;
    } else if (this.params.Type == ComplexType.List) {
      this.listValues = this.params.ListValues;
      this.listMultiple = this.params.ListMultiple;
    } else if (this.params.Type == ComplexType.Time) {
      let date = new Date();
      this.choosenTime = `${UtilitiesService.pad(
        date.getHours(),
        2
      )}:${UtilitiesService.pad(date.getMinutes(), 2)}`; //:${UtilitiesService.pad(date.getSeconds(), 2)}
    }
  }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => {
      if (this.params.Type == ComplexType.Date) this.datePicker.open();
    });
  }

  ComplexType = ComplexType;

  choosenTime: string;
  getChoosenIntelligoTime(): IntelligoTime {
    let split = this.choosenTime.split(":");
    return {
      hour: split[0],
      minute: split[1],
      second: split.length >= 3 ? split[2] : "0"
    };
  }

  @ViewChild("datePicker", null)
  datePicker: MatDatepicker<Date>;

  choosenDate: Date;
  getChoosenIntelligoDate(): IntelligoDate {
    return {
      mday: this.choosenDate.getDate().toString(),
      month: (this.choosenDate.getMonth() + 1).toString(),
      year: this.choosenDate.getFullYear().toString()
    };
  }

  givenAddress: AddressInput = {
    area: "",
    city: "",
    country: "",
    line1: "",
    pin: "",
    state: ""
  };

  geoLoc: GeoLoc = {
    lat: 0.0,
    lng: 0.0
  };

  mapLocationUpdated(event: agm.MouseEvent) {
    this.geoLoc.lat = event.coords.lat;
    this.geoLoc.lng = event.coords.lng;
  }

  selectedListItem: ListItem;
  listValues: ListItem[];
  listMultiple: boolean;
  choosenListValues() {
    if (this.listMultiple) return this.listValues.filter(x => x.isSelected);
    else return [this.selectedListItem];
  }

  listItemsSearch: string;
  searchedListValues() {
    if (this.listItemsSearch) {
      return this.listValues.filter(
        x =>
          x.text &&
          x.text.toLowerCase().includes(this.listItemsSearch.toLowerCase())
      );
    }
    return this.listValues;
  }

  isValid(): boolean {
    switch (this.params.Type) {
      case ComplexType.Address: {
        if (
          this.givenAddress &&
          this.givenAddress.area &&
          this.givenAddress.city &&
          this.givenAddress.country &&
          this.givenAddress.line1 &&
          this.givenAddress.pin &&
          this.givenAddress.state
        ) {
          return true;
        } else return false;
      }
      case ComplexType.Date: {
        if (this.choosenDate) return true;
        else return false;
      }
      case ComplexType.Time: {
        if (this.choosenTime) return true;
        else return false;
      }
      case ComplexType.List: {
        if (this.listMultiple) {
          if (this.choosenListValues() && this.choosenListValues().length > 0)
            return true;
          else return false;
        } else {
          return this.selectedListItem != null;
        }
      }
      case ComplexType.Location: {
        if (this.geoLoc) return true;
        else return false;
      }
      default:
        return true;
    }
  }

  dialogClose() {
    this.dialogRef.close(true);
  }
}

export enum ComplexType {
  Date,
  Time,
  Location,
  Address,
  List
}

export interface ComplexInputParams {
  Type: ComplexType;
  DefaultGeoLoc?: GeoLoc;
  ListValues?: ListItem[];
  ListMultiple?: boolean;
  AddressRequiredFields?: string[];
  dateRange?: IntelligoDateRange;
}
