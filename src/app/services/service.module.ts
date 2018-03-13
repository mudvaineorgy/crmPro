import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

// SERVICIOS
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  LoginGuardGuard,
  AdminGuard,
  VerificaTokenGuard,
  SubirArchivoService,
  ServicioService,
  ClienteService,
  EstadoService
} from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuardGuard,
    AdminGuard,
    VerificaTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    ServicioService,
    ClienteService,
    EstadoService
  ],
  declarations: []
})
export class ServiceModule {}
