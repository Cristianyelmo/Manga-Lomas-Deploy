import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET() {
   
    

    const producto = await prisma.compras.findMany({
        where: {
            compra:false,
            id_usuario:1
        },
        orderBy: {
            id_producto: 'asc' },
        include: {
            productos:true
        },
    });
    const totalValue = producto.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.productos.precio * currentItem.cantidad ;
      }, 0); 

      const productosShopping = {
        producto,
        totalValue
      }

    return NextResponse.json(productosShopping);
}