import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

import swal from 'sweetalert2';


@Injectable()

export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(public http: HttpClient, public router: Router, public _subirArchivoService: SubirArchivoService) {
    this.cargarStorage();
  }

  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;

    return this.http.get(url)
    .map( (resp: any) => {
      this.token = resp.token;
       localStorage.setItem('token', this.token);
       console.log('TOKEN RENOVADO');

       return true;
    })
    .catch( err => {
      this.router.navigate(['/login']);
        swal('No se pudo renovar la autorizacion', 'No es popsible renovar la autorizacion' , 'error');
        return Observable.throw( err );
    });
  }


  // =========================
  // FUNCION DE VERIFICACION DEL LOGIN
  // =========================
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }


  // =========================
  // FUNCION DE CARGAR LOS DATOS DEL STORAGE
  // =========================
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse (localStorage.getItem('usuario'));
      this.menu = JSON.parse (localStorage.getItem('menu'));
    }else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  // =========================
  // FUNCION DE GUARDAR EN EL STORAGE
  // =========================
  guardarStorage( id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario) );
    localStorage.setItem('menu', JSON.stringify(menu) );

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


 // =========================
 // FUNCION DEL LOGOUT
 // =========================
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem( 'usuario');
    localStorage.removeItem( 'token');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  // =========================
  // FUNCION DE LOGIN CON GOOGLE
  // =========================

  loginGoogle( token: string ) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token } )
            .map( (resp: any) => {
              this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
    });
  }


  // =========================
  // FUNCION DE LOGIN
  // =========================
  login( usuario: Usuario, recordarme: boolean= false) {
    let url = URL_SERVICIOS + '/login';

    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    }else {
      localStorage.removeItem('email');
    }

    return this.http.post(url, usuario)
                .map( (resp: any) => {
                  this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                  return true;
                })
                .catch( err => {
                  swal('Error en Login', err.error.mensaje , 'error');
                  return Observable.throw( err );
                });
  }

  // =========================
  // FUNCION DE CREAR UN USUARIO
  // =========================
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).map((resp: any) => {
      swal('Usuario Creado', usuario.email, 'success');
      return resp.usuario;
    })
    .catch( err => {
      swal(err.error.mensaje, err.error.errors.message , 'error');
      return Observable.throw( err );
    });
  }

// =========================
// FUNCION DE ACTUALIZAR USUARIO
// =========================

actualizarUsuario( usuario: Usuario ) {

  let url = URL_SERVICIOS + '/usuario/' + usuario._id;
  url += '?token=' + this.token;

  return this.http
    .put(url, usuario)
    .map((resp: any) => {
      if (usuario._id === this.usuario._id) {
        let usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
      }

      swal('Usuario Actualizado', usuario.nombre, 'success');

      return true;
    })
    .catch(err => {
      swal(err.error.mensaje, err.error.errors.message, 'error');
      return Observable.throw(err);
    });
}

// =========================
// FUNCION PARA CAMBIAR IMAGEN DEL USUARIO
// =========================

cambiarImagen( archivo: File, id: string ) {
  this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
      .then((resp: any) => {

        this.usuario.img = resp.usuario.img;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage( id, this.token, this.usuario, this.menu );
      })
      .catch(resp => {

      });
}

// =========================
// FUNCION PARA CARGAR USUARIOS
// =========================
cargarUsuarios( desde: number = 0 ) {
  let url = URL_SERVICIOS + '/usuario?desde=' + desde;
  return this.http.get( url );
}

// =========================
// FUNCION PARA BUSCAR USUARIOS
// =========================

buscarUsuarios( termino: string) { // busqueda/coleccion/usuarios/test6

  let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
  return this.http.get(url)
              .map(( resp: any ) => resp.usuarios);
}

// =========================
// FUNCION PARA BUSCAR UN USUARIO POR ID
// =========================

borrarUsuario( id: string ) {

  let url = URL_SERVICIOS + '/usuario/' + id;
  url += '?token=' + this.token;

  return this.http.delete(url)
        .map( resp => {
          swal('Usuario Borrado', 'Usuario eliminado correctamente del sistema', 'success');
          return true;
        });
}

}

// id_rsa.pub
// git@github.com:mudvaine1983/Crm-pro.git
// debug1: Offering public key: RSA SHA256:ejN8i/ZLSBBhQM6JZ+NanZCzaSAOopEqxi7B8n0r/oI /c/Users/Jaime/.ssh/id_rsa