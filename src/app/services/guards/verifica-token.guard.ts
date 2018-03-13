import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';

@Injectable()
export class VerificaTokenGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) {

  }

  canActivate(): Promise<boolean> | boolean {

    console.log('token Guard');
    let token = this._usuarioService.token;
    let payload = JSON.parse( atob( token.split('.') [1] ) );
    let expirado = this.expirado( payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }


    return this.verificaRenueva( payload.exp );
  }

// =========================
// VERIFICA SI ESTA APUNTO DE EXPIRAR EL TOKEN
// =========================
verificaRenueva(fechaExp: number): Promise<boolean> {

  return new Promise( (resolve, reject) => {

    let tokenExp = new Date( fechaExp * 1000 );
    let ahora = new Date();

    ahora.setTime( ahora.getTime() + ( 1 * 60 * 60 * 1000 ) );

    if (tokenExp.getTime() > ahora.getTime() ) {
      resolve(true);
    }else {

      this._usuarioService.renuevaToken()
      .subscribe (() => {
        resolve(true);
      }, () => {
        reject(false);
      });
    }
    // console.log('Fecha de expiracion:-', tokenExp);
    // console.log('Fecha de expiracion:-', ahora);
    resolve( true );
  });
}

// =========================
// VERIFICA SI LA FECHA DE EXPIRACION YA VENCIO
// =========================
  expirado(fechaExp: number) {
  let ahora = new Date().getTime() / 1000;

    if ( fechaExp < ahora) {
      return true;
    }else {
      return false;
    }
  }


}
