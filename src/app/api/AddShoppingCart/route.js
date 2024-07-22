import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function POST(request) {
  const { cantidad, fecha, total, id_usuario, id_producto } =
    await request.json();

  const CompraAdd = await prisma.compras.findFirst({
    where: {
      id_usuario: 1,
      id_producto: id_producto,
      compra: false,
    },
  });
 
  let CalificacionAgregada;

  if (!CompraAdd) {
    CalificacionAgregada = await prisma.compras.create({
      data: {
        cantidad,
        fecha,
        total,
        id_usuario,
        id_producto,
        compra: false,
      },
    });
  }

  if (CompraAdd) {
    const nuevaCantidad = CompraAdd.cantidad + 1;
    const objectCartAdd = {
      cantidad: nuevaCantidad,
      fecha: CompraAdd.fecha,
      total: CompraAdd.total,
      id_usuario: CompraAdd.id_usuario,
      id_producto: CompraAdd.id_producto,
      compra: CompraAdd.compra,
    };
    CalificacionAgregada = await prisma.compras.update({
      where: { id: Number(CompraAdd.id) },
      data: objectCartAdd,
    });
  }

  return NextResponse.json({ mensaje: "Datos recibidos correctamente" });
}
