import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { ToasterService } from 'angular2-toaster';


@Injectable({
    providedIn: 'root',
})
export class PopUpManager {
    constructor(
        private toast: ToasterService,
    ) { 
    }
    /**
     * showToast
     */
    public showToast(message: string, tittle = '') {
        this.toast.pop('success',message, tittle);
    }

    public showErrorToast(message: string) {
        const status: any = 'danger';
        this.toast.pop('success',message, status);
    }

    public showInfoToast(message: string) {
        const status: any = 'info';
        const duration: any = 0
         this.toast.pop('info', message, 'Info');
    }

    public showAlert(status, text) {
        Swal.fire({
            icon: 'info',
            title: status,
            text: text,
            confirmButtonText: 'Aceptar',
        });
    }

    public showSuccessAlert(text) {
        Swal.fire({
            icon: 'success',
            title: 'Operación Exitosa',
            text: text,
            confirmButtonText: 'Aceptar',
        });
    }

    public showErrorAlert(text) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: text,
            confirmButtonText: 'Aceptar',
        });
    }
}
