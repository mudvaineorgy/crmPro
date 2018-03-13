export class Cliente {
  constructor(
    public nombre: string,
    public img: string,
    public usuario?: string,
    public servicio?: string,
    public estado?: string,
    public _id?: string
  ) {}
}
