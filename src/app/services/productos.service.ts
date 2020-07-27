import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  url:string = 'https://angular-html2-8287d.firebaseio.com/productos_idx.json'
  cargando = true;
  productos: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){
     this.http.get(this.url).subscribe((resp:Producto[]) => {
       console.log(resp);
       this.productos = resp;
       this.cargando = false;
     });
   }
}
