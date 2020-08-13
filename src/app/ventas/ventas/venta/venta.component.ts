import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
//import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../Model/persona.model';
import { Router, ActivatedRoute } from '@angular/router';
import { VentaService } from '../../services/venta.service';
import { NgForm } from '@angular/forms';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ArticuloventaComponent } from '../articuloventa/articuloventa.component';



@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {

  PersonaList: Persona[];
  isValid: boolean = true;
  constructor(
    public PersonaService: PersonaService,
    private router: Router,
    private dialog: MatDialog,
    private currentRouter: ActivatedRoute,
    public service: VentaService
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['ARTICULO', 'PRECIO', 'CANTIDAD', 'DESCUENTO', 'TOTAL', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {

    // let orderID = this.currentRouter.snapshot.paramMap.get('id');
    let ventaID = '15';


    // if (orderID == null)
    //this.resetForm();
    // else {
    this.service.getVentaByID(parseInt(ventaID)).subscribe((res: any) => {
      this.service.formData = res.ventas;
      console.log("venta=>>>>>>", this.service.formData = res.ventas);
      this.service.ventaArticulos = res.detalleVentas;
      console.log("detalles=>>>>>>", this.service.ventaArticulos = res.ventas.detalleVentas);

      // this.listData = this.service.ventaArticulos = res.ventas.detalleVentas
      this.listData = new MatTableDataSource(res.ventas.detalleVentas);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });



    // }//Fin de Init

    this.PersonaService.getPersonaList().subscribe(
      (res: any) => {
        this.PersonaList = res as Persona[]
        console.log("PERSONA", this.PersonaList = res as Persona[])
      });



  }
  AddOrEditOrdenItem(ordenItemIndex, OrderID) {
    let ventaArticuloIndex= ordenItemIndex.detalleVentaId
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { ventaArticuloIndex, OrderID };
    console.log(dialogConfig.data);
    this.dialog.open(ArticuloventaComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        this.updateGrandTotal();
      });
  }

  updateGrandTotal() {
    this.service.formData.total = this.service.ventaArticulos.reduce((prev, curr) => {
      return prev + curr.total;
    }, 0)
    this.service.formData.total = parseFloat(this.service.formData.total.toFixed(2));
  }





  validateForm() {
    this.isValid = true;
    if (this.service.formData.personaId == 0)
      this.isValid = false;
    // else if (this.service.orderItems.length == 0)
    this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        // this.toastr.success('submitted Successfully', 'Restaurant App.');
        //this.router.navigate(['/ventas']);
      });
    }
  }


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      ventaId: null,
      personaId: 0,
      tipoComprobante: null,
      serieComprobante: Math.floor(100000 + Math.random() * 900000).toString(),
      numComprobante: Math.floor(100000 + Math.random() * 900000).toString(),
      impuesto: 0,
      total: 0,
    };

    //this.service.orderItems = [];
  }

}
