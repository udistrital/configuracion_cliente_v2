import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../../../@core/utils/load.service';
@Component({
    selector: 'ngx-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    isLoading: Subject<boolean> = this.loaderService.isLoading;
    constructor(public loaderService: LoaderService) { }
}
