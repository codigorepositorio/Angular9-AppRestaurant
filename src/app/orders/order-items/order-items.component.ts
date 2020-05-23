import { Component, OnInit, INJECTOR, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderItem } from 'src/app/shared/order-item.model';
import { ItemService } from 'src/app/shared/item.service';
import { Item } from 'src/app/shared/item.model';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/shared/order.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styles: []
})
export class OrderItemsComponent implements OnInit {

  formData: OrderItem;
  itemList: Item[]
  isValid: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data,
    public dialogRef: MatDialogRef<OrderItemsComponent>,
    private itemService: ItemService,
    private orderService: OrderService) { }

  ngOnInit() {    
    // this.itemService.getItemList().then(res => this.itemList = res as Item[]);

    this.itemService.getItemList().subscribe((res:any)=>this.itemList = res as Item[]);
     
    if (this.data.ordenItemIndex == null)
      this.formData = {
        OrderItemID: null,
        OrderID: this.data.OrderID,
        ItemID: 0,
        ItemName: '',
        price: 0,
        Quantity: 0,
        Total: 0
      }
    else
     this.formData = Object.assign({}, this.orderService.orderItems[this.data.ordenItemIndex]);     
    // console.log(this.formData = Object.assign({}, this.orderService.orderItems[this.data.ordenItemIndex]));    
  }
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formData.price = 0;
      this.formData.ItemName = '';
    }
    else {
      this.formData.price = this.itemList[ctrl.selectedIndex - 1].price;    
      this.formData.ItemName = this.itemList[ctrl.selectedIndex - 1].name;
    }
    this.updateTotal();
  }

  updateTotal() {
    this.formData.Total = parseFloat((this.formData.Quantity * this.formData.price).toFixed(2));
  }

  onsubmit(form: NgForm) {

    if (this.validateForm(form.value)) {
      if (this.data.ordenItemIndex == null)
        this.orderService.orderItems.push(form.value);
      else
        this.orderService.orderItems[this.data.ordenItemIndex] = form.value
      this.dialogRef.close();
    }
  }

  validateForm(formData: OrderItem) {
    this.isValid = true;
    if (formData.ItemID == 0)
      this.isValid = false;
    else if (formData.Quantity == 0)
      this.isValid = false;
    return this.isValid
  }


}
