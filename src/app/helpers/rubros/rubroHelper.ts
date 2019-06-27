import { RequestManager } from '../../managers/requestManager';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { PopUpManager } from '../../managers/popUpManager';

@Injectable({
    providedIn: 'root',
})
export class RubroHelper {

    constructor(private rqManager: RequestManager,
                private pUpManager: PopUpManager ) { }

    
    /**
     * Gets arbol
     *  returns one tree level at once.
     * @param [branch] tree's branch to request info from the API
     * @returns  branch information.
     */
    public getArbol(branch?: string) {
        this.rqManager.setPath('PLAN_CUENTAS_MID_SERVICE');
        // this.rqManager.setPath('DUMMY_SERVICE');
        // Set the optional branch for the API request.
        const unidadEjecutora = 1;
        const params = {
            rama: branch,
        };
        // call request manager for the tree's data.
        return this.rqManager.get(`v1/rubro/ArbolRubros/${unidadEjecutora.toString()}`, params);

    }

    /**
     * Gets full arbol
     *  returns full rubro's tree information (all nodes and branches).
     * @returns  data with tree structure for the ndTree module.
     */
    public getFullArbol() {
        this.rqManager.setPath('PLAN_CUENTAS_MONGO_SERVICE');
        // this.rqManager.setPath('DUMMY_SERVICE');
        // Set the optional branch for the API request.
        const unidadEjecutora = 1;
        // call request manager for the tree's data.
        return this.rqManager.get(`v1/arbol_rubro/FullArbolRubro/${unidadEjecutora.toString()}`);

    }

    
    /**
     * Rubros register
     * If the response has errors in the OAS API it should show a popup message with an error.
     * If the response is successs, it returns the data of the updated object.
     * @param rubroData object to save in the DB
     * @returns  <Observable> data of the object registered at the DB. undefined if the request has errors
     */
    public rubroRegister(rubroData) {
        this.rqManager.setPath('PLAN_CUENTAS_MID_SERVICE');
        rubroData.UnidadEjecutora = 1; // Tomar la unidad ejecutora del token cuando este definido.
        rubroData.Organizacion = 1;
        return this.rqManager.post(`v1/rubro/RegistrarRubro`, rubroData).pipe(
            map(
                (res) => {
                    if (res['Type'] === 'error') {
                        this.pUpManager.showErrorAlert('No Se Pudo Registrar El rubro, Compruebe que no exista un rubro con el mismo Código.')
                        return undefined;
                    }
                    return res['Body'];
                },
            ),
        );

    }

 
    /**
     * Rubros delete
     * If the response has errors in the OAS API it should show a popup message with an error.
     * If the response is successs, it returns the data of the updated object.
     * @param id the id of the object to remove in the DB.
     * @returns  <Observable> object with api response. undefined if the proccess has errors
     */
    public rubroDelete(id: number) {
        this.rqManager.setPath('PLAN_CUENTAS_MID_SERVICE');
        return this.rqManager.delete(`v1/rubro/EliminarRubro`, id).pipe(
            map(
                (res) => {
                    if (res['Type'] === 'error') {
                        this.pUpManager.showErrorAlert('No Se Pudo Eliminar El rubro, Compruebe que no exista un rubro con el mismo Código.')
                        return undefined;
                    }
                    return res['Body'];
                },
            ),
        );

    }

   
    /**
     * Rubros update
     * If the response has errors in the OAS API it should show a popup message with an error.
     * If the response is successs, it returns the data of the updated object.
     * @param rubroData fields to update
     * @returns  <Obserbable> object updated information. undefined if the proccess has errors.
     */
    public rubroUpdate(rubroData) {
        this.rqManager.setPath('PLAN_CUENTAS_MID_SERVICE');
        return this.rqManager.put(`v1/rubro/`, rubroData).pipe(
            map(
                (res) => {
                    if (res['Type'] === 'error') {
                        this.pUpManager.showErrorAlert('No Se Pudo Actualizar El rubro, Compruebe que no exista un rubro con el mismo Código.')
                        return undefined;
                    }
                    return res['Body'];
                },
            ),
        );

    }
}