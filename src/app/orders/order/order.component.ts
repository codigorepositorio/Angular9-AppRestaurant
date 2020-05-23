import { Component, OnInit } from '@angular/core';
import { OrderService } from './../../shared/order.service';
import { NgForm } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from 'src/app/shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
// import { OrderItem } from 'src/app/shared/order-item.model';
// import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  CustomerList: Customer[];
  isValid: boolean = true;

  constructor(
    public service: OrderService,
    private dialog: MatDialog,
    public customerService: CustomerService,
    private toastr: ToastrService,
    private router: Router,
    private currentRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    let orderID = this.currentRouter.snapshot.paramMap.get('id');
    //console.log(orderID);

    if (orderID == null)
      this.resetForm();
    else {
      this.service.getOrderByID(parseInt(orderID)).then(res => {
        this.service.formData = res.order;
        this.service.orderItems = res.orderDetails;
      });

    }
    // this.customerService.getCustomerList().subscribe(
    //   res => this.CustomerList = res as Customer[]);

    this.customerService.getCustomerList().subscribe(
      (res: any) => {
        this.CustomerList = res as Customer[]
      },
      err => {
        console.log(err)
      }
    );
  }


  resetForm(form?: NgForm) {
    if (form = null)
      form.resetForm();
    this.service.formData = {
      OrderID: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerID: 0,
      PMethod: null,
      GTotal: 0,
      DeletedOrderItemIDs: ''
    };

    this.service.orderItems = [];
  }

  AddOrEditOrdenItem(ordenItemIndex, OrderID) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { ordenItemIndex, OrderID };

    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed()
      .subscribe(res => {
        this.updateGrandTotal();
      });
  }

  onDeleteOrderItem(OrdenItemID: number, i: number) {
    if (OrdenItemID != null)
      this.service.formData.DeletedOrderItemIDs += OrdenItemID + ",";
    this.service.orderItems.splice(i, 1);
    this.updateGrandTotal();

  }
  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0)
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  validateForm() {
    this.isValid = true;
    if (this.service.formData.CustomerID == 0)
      this.isValid = false;
    else if (this.service.orderItems.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit(form: NgForm) {
    if (this.validateForm()) {
      this.service.saveOrUpdateOrder().subscribe(res => {
        this.resetForm();
        this.toastr.success('submitted Successfully', 'Restaurant App.');
        this.router.navigate(['/orders']);
      });
    }
  }

}
