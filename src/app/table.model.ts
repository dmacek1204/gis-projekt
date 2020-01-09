import { BaseStation } from './base-station.model';
export class Table extends BaseStation {
    distance: number;
    powerOfSignal: number;

    constructor( distance?: number, powerOfSignal?: number) {
        super();
        this.distance = distance;
        this.powerOfSignal = powerOfSignal;
    }
}
