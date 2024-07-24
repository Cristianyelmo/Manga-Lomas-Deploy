import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(req, { params }) {
    const { id } = params;
    

    const producto = await prisma.productos.findUnique({
        where: {
            id: parseInt(id, 10), 
        },
        include: {
            Calificacion: { 
                include: { usuario: true,compras:true } 
            }
        },
    });

    if (!producto) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

 
    const productosSimilares = await prisma.productos.findMany({
        where: {
            id_categoria: producto.id_categoria,
            id: {
                not: producto.id,  
            },
        },
    });

  
    const response = {
        producto,
        productosSimilares
    };

    return NextResponse.json(response);
}