import { Component} from '@angular/core';

import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { NgForm } from '@angular/forms';
import { IUsuario } from 'src/app/models/usuario.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  usuario: IUsuario = {
    userName: '',
    password: ''
  };

  submited = false;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private authService: AuthService
  ) {}

  onLogin(form: NgForm) {
    this.submited = true;
    if (form.valid) {
      let logged = false;

        this.authService.login(this.usuario).subscribe(
          data => {
            //this.mensajeError('Credenciales erróneas');
              //if (data.toString() === 'Error') {
            //} else {
              const token = data.token;
              localStorage.setItem('jwt', token);
              logged = true;
            //}
          },
          err => {
            console.log(err);
            //la api devuelve un 401 o 500
            switch(err.status){
              case 401:
                  this.mensajeError('Credenciales erróneas');
                  break;
              default:
                  this.mensajeError('Credenciales erróneas o servidor no disponible');
            }
            
          },
          () => {
            if (logged) {
              //si el login es correcto nos lleva al auth-tabs
              this.router.navigateByUrl('/auth-tabs');
            }
          }
        );
    }
  }

  async mensajeError(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

}