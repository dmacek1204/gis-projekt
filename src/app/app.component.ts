import { Component } from '@angular/core';
import { DataService } from './data.service';

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

  colors = ['#ff0000', '#FF9A00', '#FCFF2B', '#2CFF00', '#0044FF'];

  constructor(private dataService: DataService) {

  }

  mapClicked($event: any) {
    console.log($event);
    this.marker = { lat: $event.coords.lat, lng: $event.coords.lng };
    let data = this.dataService.getClosestBaseStations(this.marker.lat, this.marker.lng, true);
    this.activeCircles = [];
    let i = 0;
    data.forEach(base => {
      // let color = Math.floor(0x1000000 * Math.random()).toString(16);
      // color = '#' + ('000000' + color).slice(-6);
      const circle = {
        lat: +base.lat,
        lng: +base.lng,
        radius: +base.range,
        color: this.colors[i]
      };
      this.activeCircles.push(circle);
      i++;
    });
    // this.findClosestBaseStations(this.marker.getPosition().lat(), this.marker.getPosition().lng());
  }

  public findClosestBaseStations(lat: number, lng: number) {

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
