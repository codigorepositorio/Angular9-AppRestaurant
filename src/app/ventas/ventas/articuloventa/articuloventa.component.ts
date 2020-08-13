import { Component, OnInit, Inject } from '@angular/core';
import { VentaArticulo } from '../../Model/venta-articulo.model';
import { Articulo } from '../../Model/articulo.model';
import { ArticuloService } from '../../services/articulo.service';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VentaService } from '../../services/venta.service';

@Component({
  selector: 'app-articuloventa',
  templateUrl: './articuloventa.component.html',
  styleUrls: ['./articuloventa.component.css']
})
export class ArticuloventaComponent implements OnInit {
  formData: VentaArticulo;
  articuloList: Articulo[]
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef: MatDialogRef<ArticuloventaComponent>,
    private articuloService: ArticuloService,
    private ventaService: VentaService

  ) { }

  ngOnInit(): void {



    this.articuloService.getArticuloList().subscribe((res: any) => this.articuloList = res as Articulo[]);

    this.formData = Object.assign({}, this.ventaService.ventaArticulos[this.data.ventaArticuloIndex]);

    console.log("idnx", this.data.ventaArticuloIndex);

  }


  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.precio = 0;
      this.formData.articulo = '';
    }
    else {
      this.formData.precio = this.articuloList[ctrl.selectedIndex - 1].precioVenta;
      this.formData.articulo = this.articuloList[ctrl.selectedIndex - 1].nombre;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.total = parseFloat((this.formData.cantidad * this.formData.precio).toFixed(2));
  }

  onsubmit(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.ventaArticuloIndex == null)
        this.ventaService.ventaArticulos.push(form.value);
      else
        this.ventaService.ventaArticulos[this.data.ventaArticuloIndex] = form.value
      this.dialogRef.close();
    }
  }

  validateForm(formData: VentaArticulo) {
    this.isValid = true;
    if (formData.articuloId == 0)
      this.isValid = false;
    else if (formData.cantidad == 0)
      this.isValid = false;
    return this.isValid
  }

}
