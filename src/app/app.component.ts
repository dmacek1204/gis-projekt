import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Table } from './table.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-gmap';

  private activeCircles: Array<Circle> = [];

  // @ViewChild('map') gmap: ElementRef;
  map: any;
  marker: Marker = { lat: 45.813725, lng: 15.975099 };
  lat = 45.813725;
  lng = 15.975099;
  zoom = 11;
  is4g = true;
  colors = ['#ff0000', '#FF9A00', '#FCFF2B', '#2CFF00', '#0044FF'];
  tableData: Array<Table> = [];
  constructor(private dataService: DataService) {

  }

  mapClicked($event: any) {
    this.marker = { lat: $event.coords.lat, lng: $event.coords.lng };
    const data = this.dataService.getClosestBaseStations(this.marker.lat, this.marker.lng, this.is4g);
    data.sort((base1, base2) => base2.powerOfSignal - base1.powerOfSignal);
    this.tableData = data;
    this.activeCircles = [];
    let i = 0;
    data.forEach(base => {
      const circle = {
        lat: +base.lat,
        lng: +base.lng,
        radius: +base.range,
        color: this.colors[i]
      };
      this.activeCircles.push(circle);
      i++;
    });
 }

  public ToggleButton(is4g: boolean): void {
    this.is4g = is4g;
    const data = this.dataService.getClosestBaseStations(this.marker.lat, this.marker.lng, this.is4g);
    this.tableData = data;
    this.activeCircles = [];
    let i = 0;
    data.forEach(base => {
      const circle = {
        lat: +base.lat,
        lng: +base.lng,
        radius: +base.range,
        color: this.colors[i]
      };
      this.activeCircles.push(circle);
      i++;
    });
  }
}

interface Marker {
  lat: number;
  lng: number;
}

interface Circle {
  lat: number;
  lng: number;
  radius: number;
  color: string;
}
