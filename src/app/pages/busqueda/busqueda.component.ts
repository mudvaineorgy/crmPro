import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { Usuario } from '../../models/usuario.model';
import { Cliente } from '../../models/cliente.model';
import { Servicio } from '../../models/servicio.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  clientes: Cliente[] = [];
  servicios: Servicio[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {

    activatedRoute.params
    .subscribe( params => {
      let termino = params['termino'];
      this.buscar(termino);
    });

   }

  ngOnInit() {
  }

  buscar( termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
        .subscribe( (resp: any) => {
          this.servicios = resp.servicios;
          this.clientes = resp.clientes;
          this.usuarios = resp.usuarios;
        });
  }

}
