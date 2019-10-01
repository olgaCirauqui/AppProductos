import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { IProducto } from '../../models/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.page.html',
  styleUrls: ['./producto-add.page.scss']
})
export class ProductoAddPage implements OnInit{
  producto: IProducto = {
    id: 0,
    nombre: null,
    precio: 0
  };

  constructor(
    private toastCtrl: ToastController,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit() {}

  save() {
    this.productosService.addProducto(this.producto).subscribe(

        data => {
          this.producto = {
            id: 0,
            nombre: null,
            precio: 0
          };
        },
        err => {
          this.mensajeError('Error en la conexión a datos');
        },
        () => this.router.navigateByUrl('/auth-tabs/productos')
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
