import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseStation } from './base-station.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private LteData: Array<BaseStation> = [];
  private UmtsData: Array<BaseStation> = [];

  constructor(private http: HttpClient) {
    this.getDataFromJson();
  }

  public getClosestBaseStations(lat?: number, lng?: number, lte?: boolean): Array<BaseStation> {
    if (this.LteData.length === 0 || this.UmtsData.length === 0) {
    }
    let dataArray = new Array<BaseStation>();
    if (lte) {
      let increment = 0.00000001;
      while (dataArray.length < 5) {
        this.LteData.forEach(base => {
          if (base.lat < lat + increment && base.lat > lat - increment
            && base.lng < lng + increment && base.lng > lng - increment) {
            dataArray.push(base);
          }
        });
        if (dataArray.length < 5) {
          increment = increment * 10;
          dataArray = [];
        }
      }
    } else {
      let increment = 0.00000001;
      while (true) {
        this.UmtsData.forEach(base => {
          if (base.lat < lat + increment && base.lat > lat - increment
            && base.lng < lng + increment && base.lng > lng - increment) {
            dataArray.push(base);
          }
        });
        if (dataArray.length > 5) {
          break;
        } else {
          increment = increment * 10;
          dataArray = [];
        }
      }
    }

    let distancesArray = [] as number[];

    dataArray.forEach(base => {
      const R = 6371e3; // metres
      const φ1 = lat * Math.PI / 180;
      const φ2 = base.lat * Math.PI / 180;
      const Δφ = (base.lat - lat) * Math.PI / 180;
      const Δλ = (base.lng - lng) * Math.PI / 180;

      const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const d = R * c;
      distancesArray.push(d);
    });

    let closestBaseStations = new Array<BaseStation>();

    for (let i = 0; i < 5; i++) {
      let min = Math.min(...distancesArray);
      let index = distancesArray.indexOf(min);
      distancesArray.splice(index, 1);
      closestBaseStations.push(dataArray[index]);
    }

    console.log(closestBaseStations);
    return closestBaseStations;
  }

  private getDataFromJson(): void {
    this.getJSON().subscribe((data) => {
      const dataArray = data as Array<BaseStation>;
      dataArray.forEach(base => {
        if (base.LTE) {
          if (base.range < 5000) {
            this.LteData.push(new BaseStation(base.lat, base.lng, base.LTE, base.range, base.power));
          }
        } else {
          if (base.range < 5000) {
            this.UmtsData.push(new BaseStation(base.lat, base.lng, base.LTE, base.range, base.power));
          }
        }
      });
    });
    // console.log(this.UmtsData);
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

}
