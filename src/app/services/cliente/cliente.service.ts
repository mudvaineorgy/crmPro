import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario/usuario.service';
import { Cliente } from '../../models/cliente.model';

import swal from 'sweetalert2';
import { ClientesComponent } from '../../pages/clientes/clientes.component';
import { Title } from '@angular/platform-browser';


@Injectable()
export class ClienteService {
  totalClientes: number = 0;
  termino: string;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) {}

  // =========================
// FUNCION PARA CARGAR CLIENTES
// ===========================

  cargarClientes(desde: number = 0) {
    let url = URL_SERVICIOS + '/cliente?desde=' + desde;

    return this.http.get(url)
          .map( (resp: any) => {

          this.totalClientes = resp.total;
          return resp.clientes;

        });
  }

  buscarClientes(termino: string) {
    // busqueda/coleccion/usuarios/test6

    let url = URL_SERVICIOS + '/busqueda/coleccion/clientes/' + termino;
    return this.http.get(url).map((resp: any) => resp.clientes);
  }

  borrarCliente(id: string) {
    let url = URL_SERVICIOS + '/cliente/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url)
    .map(resp => {
      swal('Cliente Borrado', 'El cliente ha sido borrado exitosamente', 'success');
      return resp;
    });
  }

  guardarCliente(cliente: Cliente) {
    let url = URL_SERVICIOS + '/cliente';

    if (cliente._id) {
      // ACTUALIZANDO

      url += '/' + cliente._id;
      url += '?token=' + this._usuarioService.token;

      return this.http.put(url, cliente).map((resp: any) => {
        swal('Cliente Actualizado', cliente.nombre, 'success');
        return resp.cliente;
      });
    } else {
      // CREANDO
  
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, cliente)
          .map((resp: any) => {
            swal('Cliente Creado', cliente.nombre, 'success');
            return resp.cliente;
      });
    }
  }

  cargarCliente(id: string) {
    const url = URL_SERVICIOS + '/cliente/' + id;

    return this.http.get(url).map((resp: any) => resp.cliente);
  }
}

