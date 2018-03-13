import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router ) {

  }

  canActivate() {

    if (this._usuarioService.usuario.role === 'ADMIN_ROLE') {
      return true;
    }else {
      this._usuarioService.logout();
      swal('Oops...', 'No tienes permisos de acceso', 'error');
      console.log('Bloqueado por el Admin Guard');
      return false;
    }
      }
    

}
