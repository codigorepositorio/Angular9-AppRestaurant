import { VentaArticulo } from './venta-articulo.model';

export class Venta {
    ventaId: number;
    personaId: number;
    tipoComprobante: string;
    serieComprobante: string;
    numComprobante: string;
    fechaHora?: Date;
    impuesto: number;
    total: number;
    estado?: boolean;
    detalleVentas?:VentaArticulo
}