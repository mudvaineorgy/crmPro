import { Injectable } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ClienteService } from '../cliente/cliente.service';

declare var swal: any;

@Injectable()
export class ServicioService {
  totalServicios: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _clienteService: ClienteService
  ) {}

  /*
  cargarServicios(desde: number = 0) {
    let url = URL_SERVICIOS + '/servicio?desde=' + desde;
      return this.http.get(url);
*/

  cargarServicios(desde: number = 0) {
    let url = URL_SERVICIOS + '/servicio?desde=' + desde;
    return this.http.get(url)
    .map((resp: any) => {
      this.totalServicios = resp.total;
      return resp.servicios;
    });
  }

  obtenerServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    return this.http.get(url).map((resp: any) => resp.servicio);
  }

  borrarServicio(id: string) {
    let url = URL_SERVICIOS + '/servicio/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).map(resp => {
      swal({
        title: 'Esta seguro?',
        text: 'Si elimina este servicio, no podra recuperarlo!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(borrar => {
        if (borrar) {
          swal('Este servicio se elimino correctamente!', {
            icon: 'success'
          });
        } else {
          swal('Tu servicio fue rescatado!');
        }
      });
      return true;
    });
  }

  crearServicio(nombre: string) {
    let url = URL_SERVICIOS + '/servicio';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
          .map((resp: any) => resp.servicio);
  }

  buscarServicio(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/servicios/' + termino;
    return this.http.get(url)
          .map((resp: any) => resp.servicios);
  }

  actualizarServicio(servicio: Servicio) {
    let url = URL_SERVICIOS + '/servicio/' + servicio._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, servicio).map((resp: any) => {
      swal('Servicio Actualizado', servicio.nombre, 'success');
      return resp.servicio;
    });
  }
}
