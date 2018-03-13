import { Component, OnInit } from '@angular/core';
import { Estado } from '../../models/estado.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { EstadoService } from '../../services/service.index';


 declare var swal: any;
@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html'
})
export class EstadosComponent implements OnInit {
  termino: string;
  estados: Estado[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _estadoService: EstadoService,
    public _modalUploadService: ModalUploadService
  ) {}

  ngOnInit() {
    this.cargarEstados();
    this._modalUploadService.notificacion.subscribe(() =>
      this.cargarEstados()
    );
  }

  cargarEstados() {
    this.cargando = true;
    this._estadoService.cargarEstados(this.desde)
      .subscribe(estados => this.estados = estados );
      this.cargando = false;
  }


  /*
  cargarEstatus() {
    this.cargando = true;
    this._estatusService.cargarEstatus(this.desde).subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.estatus = resp.estatus;
      this.cargando = false;
    });
  }
*/
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this._estadoService.totalEstados) {
      return;
    }

    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarEstados();
  }

  buscarEstado(termino: string) {
    if (termino.length <= 0) {
      this.cargarEstados();
      return;
    }
    this._estadoService
      .buscarEstado(termino)
      .subscribe(estados => (this.estados = estados));
  }

  guardarEstado(estado: Estado) {
    this._estadoService.actualizarEstado(estado).subscribe();
  }

  borrarEstado(estado: Estado) {
    this._estadoService
      .borrarEstado(estado._id)
      .subscribe(() => this.cargarEstados());
  }

  crearEstado() {
    swal({
      title: 'Crear Estado',
      text: 'Ingrese el nombre del estado',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }

      this._estadoService
        .crearEstado(valor)
        .subscribe(() => this.cargarEstados());
    });
  }

  actualizarImagen(estado: Estado) {
    this._modalUploadService.mostrarModal('estados', estado._id);
  }
}
