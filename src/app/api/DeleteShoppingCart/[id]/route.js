import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(req, { params }) {
  const { id } = params;

  console.log(id);

  const Eliminado = await prisma.compras.delete({
    where: {
      id: parseInt(id, 10),
    },
  });

  return NextResponse.json({
    mensaje: "Datos recibidos correctamente" /* ,data:Eliminado  */,
  });
}
