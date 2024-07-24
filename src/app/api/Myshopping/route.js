import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request, { params }) {
   
    const { searchParams } = new URL(request.url);
    const fecha = searchParams.get('fecha');
    let whereClause = {
        compra: true,
        id_usuario: 1,
      };
    
      if (fecha && fecha !== 'Todos') {
        whereClause.fecha = fecha;
      }
    const producto = await prisma.compras.findMany({
        where: whereClause,
      
        include: {
            productos: true,
            Calificacion: true
        },
    });

    const productoFecha = await prisma.compras.findMany({
        where: {
            compra: true,
            id_usuario: 1,
          },
      
        include: {
            productos: true,
            Calificacion: true
        },
    });

    const fechasUnicasArray = [...new Set(productoFecha.map(item => item.fecha))];
const productoResult = {
    producto,
    fechasUnicasArray
}


    return NextResponse.json(productoResult);
}