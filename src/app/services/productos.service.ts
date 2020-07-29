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
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

   private cargarProductos(){
    return new Promise((resolve, reject) => {
      this.http.get(this.url).subscribe((resp:Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
   }

   getProducto(id: string){
    return this.http.get(`https://angular-html2-8287d.firebaseio.com/productos/${id}.json`);
   }


   buscarProducto(termino: string){
    if(this.productos.length === 0) {
      this.cargarProductos().then(() => {
         this.filtrarProductos(termino); 
      });
    } else {
         this.filtrarProductos(termino);
    }
  }


  private filtrarProductos(termino: string){
    console.log(this.productos);
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach(prod => {
      const tituloLower = prod.titulo.toLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0 ){
        this.productosFiltrado.push(prod);
      }
    });
  }

}













