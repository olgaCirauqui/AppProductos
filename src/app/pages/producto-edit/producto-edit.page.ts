import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { IProducto } from '../../models/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.page.html',
  styleUrls: ['./producto-edit.page.scss']
})
export class ProductoEditPage implements OnInit{
  producto: IProducto = {
    id: null,
    nombre: null,
    precio: 0
  };

  constructor(
    private toastCtrl: ToastController,
    private productosService: ProductosService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id: string;
      this.activatedRoute.queryParamMap.subscribe(queryParams => {
        id = queryParams.get('id');
      })
    this.getProducto(Number(id));
  }

  getProducto(id: number) {
      this.productosService.getProducto(id).subscribe(
        data => {
          this.producto = data;
        },
        err => {
          this.mensajeError('Error en la conexión a datos');
        }
    );
  }

  update(producto: IProducto) {
      this.productosService.updateProducto(producto).subscribe(
        data => {},
        err => {
          this.mensajeError('Error en la conexión a datos');
        },
        () => this.router.navigateByUrl('/auuth-tabs/productos')
    );
  }

  async mensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 3000
    });
    await toast.present();
  }


}