import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { Usuario } from '../models/usuario.model';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {

  let url = URL_SERVICIOS + '/img';
  if (!img) {
    return url + '/usuarios/xxx';
  }

  if (img.indexOf('https') >= 0) {
    return img;
  }

  switch (tipo) {

    case 'usuario':
        url += '/usuarios/' + img;
      break;

    case 'servicio':
        url += '/servicios/' + img;
      break;

    case 'cliente':
        url += '/clientes/' + img;
      break;

    case 'estado':
      url += '/estados/' + img;
      break;

    default:
        console.log('tipo de imagen inexistente, usuarios, clientes, servicios');
        url += '/usuarios/xxx';
      break;
  }

    return url;
  }

}
