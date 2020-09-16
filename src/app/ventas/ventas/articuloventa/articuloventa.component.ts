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


    var Entityarticulo =
      this.ventaService.detalleVentas.find(
        (key) => {
          return key.detalleVentaId == this.data.ventaArticuloIndex
        }
      );

    if (Entityarticulo != null) {
      this.formData = Object.assign({}, Entityarticulo);
    }
    else {
      this.formData = {
        articuloId: 0,
        articulo: "",
        cantidad: 0,
        precio: 0,
        total: 0
      }
    }
    console.log("idnx", this.data.ventaArticuloIndex);
    console.log("form", this.ventaService.detalleVentas);
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
      if (this.data.ventaArticuloIndex == null) {
        this.ventaService.detalleVentas.push(form.value);
        this.dialogRef.close();
      }
      else {
        var articulo =
          this.ventaService.detalleVentas.find(
            (key) => {
              return key.detalleVentaId == this.data.ventaArticuloIndex
            }
          );
        if (articulo != null) {
          articulo.articuloId = this.formData.articuloId;
          articulo.articulo = this.formData.articulo;
          articulo.precio = this.formData.precio;
          articulo.cantidad = this.formData.cantidad;
          articulo.descuento = this.formData.descuento;
          articulo.total = this.formData.total;
          console.log(form);
          this.dialogRef.close();
        }
      }

    }
  }

  validateForm(formData: VentaArticulo) {
    this.isValid = true;
    console.log("ID articulo: ", formData.articuloId);
    if (formData.articuloId == 0) {
      this.isValid = false;
    }
    else if (formData.cantidad == 0)
      this.isValid = false;
    return this.isValid
  }

  

}
