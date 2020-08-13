import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//Importar desde Angular MATERIAL
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderItemsComponent } from './orders/order-items/order-items.component';
import { OrderService } from './shared/order.service';
import {CdkTableModule} from '@angular/cdk/table';

import { MatTableModule } from '@angular/material/table';
import { VentasComponent } from './ventas/ventas/ventas.component';
import { VentaComponent } from './ventas/ventas/venta/venta.component';
import { ArticuloventaComponent } from './ventas/ventas/articuloventa/articuloventa.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    OrderComponent,
    OrderItemsComponent,
    VentasComponent,
    VentaComponent,
    ArticuloventaComponent,
 
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    HttpClientModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatTableModule,
    ToastrModule.forRoot()
  ],

 entryComponents:[OrderItemsComponent],

  providers: [
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
