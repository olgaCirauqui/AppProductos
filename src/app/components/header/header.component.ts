import { Component, OnInit, Input } from '@angular/core'; //importa los input entre otros
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() titulo: string; //estas propiedades tiene que dárselas la página html que lo va 
  @Input() backPath: string; //a usar...es decir le inyecta esos valores
  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private authGuard: AuthGuard
  ) {}

  ngOnInit() {
    this.userName = this.authGuard.getUserName();
  }

  logout() {
    const user = { user: this.userName };
      this.authService.logout(user).subscribe(
        data => {
          localStorage.removeItem('jwt');
        },
        err => alert('Error en el acceso a datos'),
        () => this.router.navigate(['/login'])
      );
  }

}