import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/service.index';

import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: []
})
export class ClientesComponent implements OnInit {
  totalRegistros: number = 0;
  clientes: Cliente[] = [];
  desde: number = 0;
  cargando: boolean = true;

  constructor(public _clienteService: ClienteService) {}

  ngOnInit() {
    this.cargarClientes();

  }

  cargarClientes() {
    this._clienteService.cargarClientes(this.desde)
      .subscribe( clientes => this.clientes = clientes);

    }



  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this._clienteService.totalClientes) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarClientes();
  }

  buscarCliente( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarClientes();
      return;
    }

    this._clienteService.buscarClientes( termino )
          .subscribe( clientes => this.clientes = clientes);
  }

  borrarCliente( cliente: Cliente ) {
    this._clienteService.borrarCliente( cliente._id)
        .subscribe( () => this.cargarClientes());
  }
}
