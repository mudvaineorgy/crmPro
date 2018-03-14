import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../services/service.index';
import { ServicioService } from '../../services/service.index';
import { Servicio } from '../../models/servicio.model';
import { Cliente } from '../../models/cliente.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { EstadoService } from '../../services/service.index';
import { Estado } from '../../models/estado.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styles: []
})
export class ClienteComponent implements OnInit {
  servicios: Servicio[] = [];
  servicio: Servicio = new Servicio('');
  estados: Estado[] = [];
  estado: Estado = new Estado ('');
  cliente: Cliente = new Cliente('', '', '', '', '', '', '', '', '', '', '', '', '', '', '');


  constructor(
    public _clienteService: ClienteService,
    public _servicioService: ServicioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService,
    public _estadoService: EstadoService
  ) {

    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if (id !== 'nuevo') {
        this.cargarCliente(id);
      }
    });
  }

  ngOnInit() {
    this.cargarServicioCliente();
    this.cargarEstadoCliente();
  }

  cargarServicioCliente() {
    this._servicioService.cargarServicios()
    .subscribe( servicios => this.servicios = servicios );

    this._modalUploadService.notificacion
        .subscribe( resp => {
          this.cliente.img = resp.cliente.img;
        });
  }

  cargarEstadoCliente(){
    this._estadoService.cargarEstados()
    .subscribe( estados => this.estados = estados );

    this._modalUploadService.notificacion
        .subscribe( resp => {
          this.cliente.img = resp.cliente.img;
        });
  }

  cargarCliente(id: string) {
    this._clienteService.cargarCliente(id)
      .subscribe(cliente => {
        this.cliente = cliente;
        this.cliente.servicio = cliente.servicio._id;
        this.cambioServicio( this.cliente.servicio);
  });
}

  guardarCliente( f: NgForm ) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._clienteService.guardarCliente(this.cliente)
      .subscribe(cliente => {
        this.cliente._id = cliente._id;

        this.router.navigate(['/cliente', cliente._id]);
    });
  }

  cambioServicio( id: string ) {
    this._servicioService.obtenerServicio(id)
      .subscribe( servicio => this.servicio = servicio);
  }

  cambioEstado( id: string ) {
    this._estadoService.obtenerEstado( id )
      .subscribe( estado => {

        if (estado) {
          this.estado = estado;
          } else {
          this.estado = new estado('');
          }
          });

       // this.estado = estado );
      }



cambiarFoto() {
  this._modalUploadService.mostrarModal( 'clientes', this.cliente._id);
}
}
