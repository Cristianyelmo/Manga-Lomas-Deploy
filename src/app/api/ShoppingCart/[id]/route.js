import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function PUT(request, { params }) {
  const { suma, cantidad, fecha, total, id_usuario, id_producto, compra } = await request.json();

  try {
    const producto = await prisma.productos.findUnique({
      where: { id: Number(id_producto) },
    });

    if (!producto) {
      return NextResponse.json({ message: 'Producto no encontrado' }, { status: 404 });
    }

    let nuevaCantidad = cantidad;

    if (suma) {
      if (cantidad < producto.stock) {
        nuevaCantidad = cantidad + 1;
      }
    } else {
      if (cantidad > 1) {
        nuevaCantidad = cantidad - 1;
      }
    }

    const objectCartUpdate = {
      cantidad: nuevaCantidad,
      fecha,
      total,
      id_usuario,
      id_producto,
      compra,
    };

    const compraActualizada = await prisma.compras.update({
      where: { id: Number(params.id) },
      data: objectCartUpdate,
    });

    return NextResponse.json(compraActualizada);
  } catch (error) {
    console.error('Error al actualizar el carrito:', error);
    return NextResponse.json({ message: 'Error al actualizar el carrito' }, { status: 500 });
  }
}
