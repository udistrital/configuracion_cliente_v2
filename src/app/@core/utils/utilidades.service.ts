import { Injectable } from '@angular/core';


@Injectable()
export class UtilidadesService {

    static userArray: any[];
    static jsonArray: any[];

    constructor() {
    }

    static getSumArray(array): any {
        let sum = 0;
        array.forEach(element => {
            sum += element;
        });
        return sum;
    }

}
