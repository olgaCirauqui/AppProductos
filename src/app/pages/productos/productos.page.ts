import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { IProducto } from '../../models/producto.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss']
})
export class ProductosPage implements OnInit{
  @ViewChild('lista',{static:false}) lista: IonList;
  productos: IProducto[] = [];
  userName = '';

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private productosService: ProductosService,
    private authGuard: AuthGuard
  ) {}

  ngOnInit() {
    this.userName = this.authGuard.getUserName();
    this.getProductos();
  }

  getProductos() {
    this.productos = [];
      this.productosService.getProductos().subscribe(
        data => {
          this.productos = data;
        },
        err => {
          this.mensajeError('Error de acceso a datos');
        }
      );
   }

  add() {
    this.router.navigateByUrl('/producto-add');
  }

  edit(producto: IProducto) {
    this.lista.closeSlidingItems();
    this.router.navigate(['/producto-edit'], {
      queryParams: { id: producto.id }
    });
  }

  async delete(producto: IProducto) { //async espera mi decisión para seguir adelante
    const confirm = await this.alertCtrl.create({ //esto es un alert
      header: 'Eliminar producto',
      subHeader: '¿Seguro que quieres realizar esta acción?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('NO');
          }
        },
        {
          text: 'Sí',
          handler: () => {
              this.productosService.deleteProducto(producto.id).subscribe(
                data => {},
                err => {
                  this.mensajeError('Error en la conexión a datos');
                },
                () => this.getProductos()
              );
          }
        }
      ]
    });
    await confirm.present();
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
