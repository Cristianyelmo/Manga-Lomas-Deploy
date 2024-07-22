import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function POST(request) {
  const { id_compra, id_usuario, id_producto, calificacion, comentario } =
    await request.json();

  const CalificacionAgregada = await prisma.Calificacion.create({
    data: {
      id_compra,
      id_producto,
      id_usuario,
      calificacion,
      comentario,
    },
  });

  return NextResponse.json({
    mensaje: "Datos recibidos correctamente",
    data: CalificacionAgregada,
  });
}
