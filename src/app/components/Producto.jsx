"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { ProductHook } from "../context/ProductContext";
import Preloader from "./Preloader";
import { GetIdProducts } from "../services/Products.service";
import { UserHook } from "../context/UserContext";

export default function Producto() {
  const {
    idPage,
    Preloading,
    setPreloading,
    dataproductsforid,
    setDataProductsforid,
    AddCartProduct,
    addcart
  } = ProductHook();
const {ratingselected} = UserHook()
  useEffect(() => {
   
    const GetidProducts = async () => {
      try {
        setPreloading(true);
        const products = await GetIdProducts(idPage);
        setDataProductsforid(products);
      } catch (error) {
        console.error;
      } finally {
        setTimeout(() => {
          setPreloading(false);
        }, 1000);
      }
    };

    GetidProducts();
  }, []);

  if (Preloading) {
    return (<Preloader />);
  }

  return (
     <div className="">
      <section className="lg:h-[500px]  grid lg:grid-cols-2 grid-cols-1 gap-5  p-[20px] ">
        <div className="relative border-[4px] border-black h-[400px] lg:h-[100%]">
          <div className=" absolute inset-0 flex flex-col items-center justify-center">
            <div className="relative">
              <div className="relative">
                <Image
                  src={`/productos/${dataproductsforid && dataproductsforid.producto.image}`}
                  height={400}
                  width={213}
                  className="border-[4px] border-black z-20 relative"
                />
                <div className="border-[4px] border-black h-[300px] w-[213px] bg-black z-10 absolute left-[4%] bottom-[-3%]"></div>
              </div>
            </div>
          </div>

          <Image
            src="/imagen/fondoCategory.png"
            height={1920}
            width={1603}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="text-black text-center flex flex-col justify-around">
          <h1 className="text-5xl ">{dataproductsforid && dataproductsforid.producto.nombre}</h1>
          <h1 className="text-3xl ">Sipnosis</h1>
          <p className="text-sm">{dataproductsforid && dataproductsforid.producto.sipnosis}</p>

          <div className="flex justify-center p-4">
            <div>
              <p>Precio:</p>
            <p className="text-4xl">{dataproductsforid && dataproductsforid.producto.precio}$</p>
            </div>
          </div>

          <button className="bg-black w-full h-[50px] text-white" onClick={()=>AddCartProduct(dataproductsforid.producto.id,dataproductsforid.producto.precio)}>
           {!addcart ? 'Agregar al carrito' : 'Agregado'}
          </button>
        </div>
      </section>

      <section className="p-4">
        <h1 className="text-4xl text-black text-center mt-10">Comentarios</h1>

        {dataproductsforid && dataproductsforid.producto.Calificacion.map((item,index) => (
          <section key={index} className="flex flex-col md:flex-row text-black mt-6 border-black border-[4px] p-4">
            <div className="flex flex-col items-center md:items-start md:mr-4 mb-4 md:mb-0">
              <Image src="/imagen/perfil.svg" width={50} height={50} />
              <p className="text-center md:text-left">{item.usuario.nombre}</p>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col md:flex-row justify-between items-center mb-2">
                <div className="flex space-x-2 mb-2 md:mb-0">
                 {ratingselected.map((rating,index)=>( 
                 item.calificacion <= index ?
                 <Image key={index} src="/imagen/Rating0.svg" height={30} width={30} /> :
                 <Image key={index} src="/imagen/Rating1.svg" height={30} width={30} />
                ))}
                 
                </div>
                <p className="text-sm">{item.compras.fecha}</p>
              </div>
              <p className="text-sm">{item.comentario}</p>
            </div>
          </section>
        ))}
      </section>
<section>
<h1 className="text-4xl text-black text-center mt-10 mb-10">Productos relacionados</h1>
      <Carousel arrayProductos={dataproductsforid && dataproductsforid.productosSimilares} />
      </section>
    </div> 
 
  );
}
