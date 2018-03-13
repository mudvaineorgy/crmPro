import { Component, OnInit } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { ServicioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


 declare var swal: any;
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html'
})
export class ServiciosComponent implements OnInit {
  termino: string;
  servicios: Servicio[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _servicioService: ServicioService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarServicios();
    this._modalUploadService.notificacion.subscribe(() =>
      this.cargarServicios()
    );
  }

  cargarServicios() {
    this.cargando = true;
    this._servicioService.cargarServicios(this.desde)
      .subscribe(servicios => this.servicios = servicios );
      this.cargando = false;
  }

  /*
  cargarServicios() {
    this.cargando = true;
    this._servicioService.cargarServicios(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.servicios = resp.servicios;
      this.cargando = false;
    });
  }
*/
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this._servicioService.totalServicios) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarServicios();
  }

  buscarServicio(termino: string) {
    if (termino.length <= 0) {
      this.cargarServicios();
      return;
    }
    this._servicioService
      .buscarServicio(termino)
      .subscribe(servicios => (this.servicios = servicios));
  }

  guardarServicio(servicio: Servicio) {
    this._servicioService.actualizarServicio(servicio).subscribe();
  }

  borrarServicio(servicio: Servicio) {
    this._servicioService
      .borrarServicio(servicio._id)
      .subscribe(() => this.cargarServicios());
  }

  crearServicio() {
    swal({
      title: 'Crear Servicio',
      text: 'Ingrese el nombre del servicio',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._servicioService
        .crearServicio(valor)
        .subscribe(() => this.cargarServicios());
    });
  }

  actualizarImagen(servicio: Servicio) {
    this._modalUploadService.mostrarModal('servicios', servicio._id);
  }
}
