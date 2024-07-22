import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';
export async function PUT(request) {
  const datacompra = await request.json();


  const promises = datacompra.map(async (item) => {
    let resultFinally;

    if (item.cantidad <= item.productos.stock) {
      const resultadostock = item.productos.stock - item.cantidad;
      const vendido = item.productos.vendidos + item.cantidad;
      const objectCartAdd = {
        nombre: item.productos.nombre,
        stock: resultadostock,
        sipnosis: item.productos.sipnosis,
        precio: item.productos.precio,
        id_categoria: item.productos.id_categoria,
        id_subcategoria: item.productos.id_subcategoria,
        vendidos: vendido,
        image: item.image,
      };
      const Productoactualizado = await prisma.productos.update({
        where: { id: Number(item.productos.id) },
        data: objectCartAdd,
      }); 



      const compraFecha = await prisma.compras.findFirst({
        where: { id_producto: Number(item.id_producto),fecha:item.fecha,compra:true }
       
    });
 
 let Carritoctualizado
    if(compraFecha){
      const TotalSum = item.total * item.cantidad;
      const newTotal = compraFecha.total + TotalSum
      const newAmount = compraFecha.cantidad + item.cantidad
      const objectCarritoUpdate = {
        cantidad: newAmount,
        fecha: compraFecha.fecha,
        total: newTotal,
        id_usuario: compraFecha.id_usuario,
        id_producto: compraFecha.id_producto,
        compra: true,
      };

     Carritoctualizado = await prisma.compras.update({
        where: { id: Number(compraFecha.id) },
        data: objectCarritoUpdate,
      });
    } else{ 
      const TotalSum = item.total * item.cantidad;
      const objectCarritoUpdate = {
        cantidad: item.cantidad,
        fecha: item.fecha,
        total: TotalSum,
        id_usuario: item.id_usuario,
        id_producto: item.id_producto,
        compra: true,
      };

       Carritoctualizado = await prisma.compras.update({
        where: { id: Number(item.id) },
        data: objectCarritoUpdate,
      });
    }   
       resultFinally = {
       
        Carritoctualizado,
        Productoactualizado
      }; 
     
    } else {
      resultFinally = `solo quedan ${item.productos.stock} del producto ${item.productos.nombre}`;
    }

    return resultFinally;
  });

  const resultados = await Promise.all(promises);

  return NextResponse.json({
    mensaje: "Datos recibidos correctamente",
    data: datacompra,
  });
}
