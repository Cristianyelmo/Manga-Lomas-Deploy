import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export async function GET(request, { params }){
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');
  
let valuePetition = {}
    if (filter && filter == 'MasVendido') {
        
           valuePetition = {orderBy:{vendidos: 'desc'}}
          
      }

      if (filter && filter == 'MenosVendido') {
        
        valuePetition = {orderBy:{vendidos: 'asc'}}
       
   }

   if (filter && filter == 'MenosStock') {
        
    valuePetition = {orderBy:{stock: 'asc'}}
   
}

if (filter && filter == 'SinStock') {
        
    valuePetition = {where:{stock: 0}}
   
}

    const products = await prisma.productos.findMany(
        valuePetition
    )


     


const ObjectProduct = {
    products
   
}

    return NextResponse.json(ObjectProduct)
}