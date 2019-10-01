import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProductoFormComponent, HeaderComponent],
  imports: [CommonModule, FormsModule, IonicModule.forRoot()],
  exports: [ProductoFormComponent, HeaderComponent]
})
export class ComponentsModule {}
