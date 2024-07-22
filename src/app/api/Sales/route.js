import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');
    let whereClause = {
        compra: true,
       
      };
    
      if (fecha && fecha !== 'Todos') {
        whereClause.fecha = fecha;
      }
    

    const producto = await prisma.compras.findMany({
        where:whereClause,
        include: {
            productos:true,
            usuario:true
        },
    });


    const producto2 = await prisma.compras.findMany({
        where:{
            compra: true,
           
          },
        include: {
            productos:true,
            usuario:true
        },
    });
    const fechasUnicasArray = [...new Set(producto2.map(item => item.fecha))];
   const ProductosDate = { producto,
    fechasUnicasArray

}

    return NextResponse.json(ProductosDate)
}
   ;
