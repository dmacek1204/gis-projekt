export class BaseStation {
    lat: number;
    lng: number;
    LTE: boolean;
    range: number;
    power: number;

    constructor(lat?: number, lng?: number, LTE?: boolean, range?: number, power?: number) {
        this.lat = lat;
        this.lng = lng;
        this.LTE = LTE;
        this.range = range;
        this.power = power;
    }
}
