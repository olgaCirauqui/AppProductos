
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IProducto } from '../../models/producto.interface';

@Component({
  selector: 'producto-form',
  templateUrl: 'producto-form.component.html'
})
export class ProductoFormComponent implements OnInit {
  @Input() producto: IProducto;
  @Input() isUpdate: boolean;
  @Output() fireAction: EventEmitter<IProducto> = new EventEmitter<IProducto>();
  submitBtn: string;
  isSubmited = false;

  constructor() {}

  ngOnInit() {
    this.submitBtn = this.isUpdate ? 'Actualizar' : 'Guardar';
  }

  processProducto(): void {
    this.isSubmited = true;
    this.fireAction.emit(this.producto);
  }
}