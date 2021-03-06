import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
email: string;
recordarme: boolean = false;
auth2: any;

  constructor( public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1 ) {
      this.recordarme = true;
    }
  }



  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1049636037248-lo7t1bpn10g7sjkh5nui0epsas8toage.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin( element ) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
    // let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;

    // console.log(token);

    this._usuarioService.loginGoogle(token)
      .subscribe( () => window.location.href = '#/clientes');
    });
  }

  ingresar( forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    // this.router.navigate(['/dashboard']);

    this._usuarioService.login( usuario, forma.value.recordarme )
                        .subscribe( correcto => this.router.navigate(['/clientes']) );
  }

}
