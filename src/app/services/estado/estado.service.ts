import { Injectable } from '@angular/core';
import { Estado } from '../../models/estado.model';
import { HttpClient } from '@angular/common/http';

import { URL_SERVICIOS } from '../../config/config';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { UsuarioService } from '../usuario/usuario.service';
import { ClienteService } from '../cliente/cliente.service';

declare var swal: any;

@Injectable()
export class EstadoService {
  totalEstados: number = 0;

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

  cargarEstados(desde: number = 0) {
    let url = URL_SERVICIOS + '/estado?desde=' + desde;
    return this.http.get(url)
    .map((resp: any) => {
      this.totalEstados = resp.total;

      return resp.estados;
    });
  }


  obtenerEstado(id: string) {
    let url = URL_SERVICIOS + '/estado/' + id;
    return this.http.get(url).map((resp: any) => resp.estado);
  }

  borrarEstado(id: string) {
    let url = URL_SERVICIOS + '/estado/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).map(resp => {
      swal({
        title: 'Esta seguro?',
        text: 'Si eliminas este estado, no podras recuperarlo!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(borrar => {
        if (borrar) {
          swal('Este estado se elimino correctamente!', {
            icon: 'success'
          });
        } else {
          swal('Tu estado fue rescatado!');
        }
      });
      return true;
    });
  }

  crearEstado(nombre: string) {
    let url = URL_SERVICIOS + '/estado';
    url += '?token=' + this._usuarioService.token;

    return this.http.post(url, { nombre })
          .map((resp: any) => resp.estado);
  }

  buscarEstado(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/estados/' + termino;
    return this.http.get(url)
          .map((resp: any) => resp.estados);
  }

  actualizarEstado(estado: Estado) {
    let url = URL_SERVICIOS + '/estado/' + estado._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put(url, estado).map((resp: any) => {
      swal('Estado Actualizado', estado.nombre, 'success');
      return resp.estado;
    });
  }
}

