import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);
  const filter = searchParams.get("filter");

  const categoria = await prisma.categoria.findUnique({
    where: { id: Number(params.id) },

    include: {
      productos: Number(filter)
        ? {
            where: { id_subcategoria: Number(filter) },
          }
        : true,
    },
  });

  const subcategorias = await prisma.subcategorias.findMany({
    where: {
      id_categoria: Number(params.id),
    },
  });

  const Category = {
    categoria,
    subcategorias,
  };

  return NextResponse.json(Category);
}
