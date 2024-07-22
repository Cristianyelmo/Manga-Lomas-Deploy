"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import { GetSales } from "../services/RatingAndSales.service";
import { GetProducts } from "../services/Products.service";
import { AdminHook } from "../context/AdminContext";
import Preloader from "../components/Preloader";
export default function Admin() {

const {  handleFilterProductChange,
  dataproducts, setDataProducts,
  filterProducts, setFilterProducts,
  Preloading, setPreloading,
  datasales, setDataSales,
  selectedfecha, setSelectFecha,
  handleFechaChange,
  dinamicUser, setDinamicUser,
  handleClick,
  DinamicUserRating
} = AdminHook();
 

 
 
  useEffect(() => {
    const Products = async () => {
      try {
        const result = await GetProducts();
        setDataProducts(result);
      } catch (error) {
        console.error;
      } finally {
        setPreloading(false);
      }
    };

    Products();
  }, []);

  useEffect(() => {
    const Sales = async () => {
      try {
        const result = await GetSales('Todos');
        setDataSales(result);
      } catch (error) {
        console.error;
      } finally {
        setPreloading(false);
      }
    };

    Sales();
  }, []);
  if (Preloading) {
    return <Preloader />;
  }
  return (
    <>
      <main className="bg-[#F3F3F3] lg:px-12 lg:py-12 px-6 py-4">
        <Header clickHeader={handleClick} />

        <div className="flex justify-center text-black space-x-10">
          <div>
            <h1 onClick={DinamicUserRating} className="cursor-pointer">
              Ventas
            </h1>
            {dinamicUser && <div className="h-[4px] w-full bg-black"></div>}
          </div>

          <div>
            <h1
              onClick={() => setDinamicUser(false)}
              className="cursor-pointer"
            >
              Mis productos
            </h1>
            {!dinamicUser && <div className="h-[4px] w-full bg-black"></div>}
          </div>
        </div>

        {dinamicUser ? (
          <section>
            <div className="flex justify-center">
              <div className=" text-black flex items-center space-x-4">
                <p>Fecha</p>
                <select
                  value={selectedfecha}
                  onChange={handleFechaChange}
                  className="border-black border-[3px] p-2 flex"
                >
                  <option>Todos</option>
                  {datasales &&
                    datasales.fechasUnicasArray.map((fecha) => (
                      <option key={fecha}>{fecha}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="hidden lg:block border-black border-[2px]  p-4">
              <div className="grid grid-cols-7 gap-10 text-black ">
                <p>Foto</p>
                <p>Nombre</p>
                <p>Precio</p>
                <p>Cantidad</p>
                <p>Fecha</p>
                <p>Usuario</p>
                <p>Total</p>
              </div>

              <div className="space-y-5">
                {datasales &&
                  datasales.producto.map((item,index) => (
                    <div key={index} className="grid grid-cols-7 gap-10 text-black ">
                      <div className="relative">
                        <Image
                          src={`/productos/${item.productos.image}.webp`}
                          height={300}
                          width={113}
                          className="border-[4px] border-black z-20 relative"
                        />
                        <div className="border-[4px] border-black h-[150px] w-[113px] bg-black z-10 absolute left-[1%] bottom-[-3%]"></div>
                      </div>
                      <p>{item.productos.nombre}</p>

                      <p>{item.productos.precio}$</p>
                      <p>{item.cantidad}</p>
                      <p>{item.fecha}</p>
                      <p>{item.usuario.nombre}</p>
                      <p>{item.total}$</p>
                    </div>
                  ))}
              </div>
            </div>




            <div className=" p-4 lg:hidden">
        

        <div className="space-y-5">
          {datasales && datasales.producto.map((item,index) => (
            <div  className="grid grid-cols-1 gap-2 justify-items-center border-black border-[2px] p-4 text-black" key={index}>
              <div className="relative">
                <Image
                  src={`/productos/${item.productos.image}`}
                  height={300}
                  width={113}
                  className="border-[4px] border-black z-20 relative"
                />
                <div className="border-[4px] border-black h-[150px] w-[113px] bg-black z-10 absolute left-[1%] bottom-[-3%]"></div>
              </div>
              <div className='flex flex-col text-center'>
                <p className='font-bold'>Nombre:</p>
              <p>{item.productos.nombre}</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Precio:</p>
              <p>{item.productos.precio}$</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Cantidad:</p>
              <p>{item.cantidad}</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Fecha:</p>
              <p>{item.fecha}</p>
              </div>
              <div className='flex flex-col text-center'>
              <p className='font-bold'>Usuario:</p>
              <p>{item.usuario.nombre}$</p>
              </div>
              <div className='flex flex-col text-center'>
              <p className='font-bold'>Total:</p>
              <p>{item.total}$</p>
              </div>
             
            </div>
          ))}
        </div>
      </div>



            

            <div className="flex flex-col text-black items-center border-black border-[2px] p-4 mt-4">
              <h1>Total</h1>
              <p>500$</p>
            </div>
          </section>
        ) : (
          <section>
            <div className="flex justify-center">
              <div className=" text-black flex items-center space-x-4">
                <p>Fecha</p>

                <select
                  value={filterProducts}
                  onChange={handleFilterProductChange}
                  className="border-black border-[3px] p-2 flex"
                >
                  <option value="Todos">Todos</option>

                  <option value="MenosVendido">Menos Vendidos</option>

                  <option value="MasVendido">Mas Vendidos</option>

                  <option value="MenosStock">Sin stock/menos stock</option>

                  <option value="SinStock">Sin stock</option>
                </select>
              </div>
            </div>

            <div className=" hidden lg:block  border-black border-[2px]  p-4">
              <div className="grid grid-cols-6 gap-10 text-black ">
                <p>Foto</p>
                <p>Nombre</p>
                <p>Precio</p>
                <p>Stock</p>
                <p>Vendidos</p>

                <p>Total</p>
              </div>

              <div className="space-y-5">
                {dataproducts && dataproducts.products.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-6 gap-10 text-black "
                  >
                    <div className="relative">
                      <Image
                        src={`/productos/${item.image}`}
                        height={300}
                        width={113}
                        className="border-[4px] border-black z-20 relative"
                      />
                      <div className="border-[4px] border-black h-[150px] w-[113px] bg-black z-10 absolute left-[1%] bottom-[-3%]"></div>
                    </div>
                    <p>{item.nombre}</p>

                    <p>{item.precio}$</p>
                    <p>{item.stock}</p>
                    <p>{item.vendidos}</p>
                    <p>{item.precio * item.vendidos}$</p>
                  </div>
                ))}
              </div>
            </div>





            <div className=" p-4 lg:hidden">
        

        <div className="space-y-5">
          {dataproducts && dataproducts.products.map((item,index) => (
            <div  className="grid grid-cols-1 gap-2 justify-items-center border-black border-[2px] p-4 text-black" key={index}>
              <div className="relative">
                <Image
                  src={`/productos/${item.image}`}
                  height={300}
                  width={113}
                  className="border-[4px] border-black z-20 relative"
                />
                <div className="border-[4px] border-black h-[150px] w-[113px] bg-black z-10 absolute left-[1%] bottom-[-3%]"></div>
              </div>
              <div className='flex flex-col text-center'>
                <p className='font-bold'>Nombre:</p>
              <p>{item.nombre}</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Precio:</p>
              <p>{item.precio}$</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Cantidad:</p>
              <p>{item.cantidad}</p>
              </div>
              <div  className='flex flex-col text-center'>
              <p className='font-bold'>Fecha:</p>
              <p>{item.fecha}</p>
              </div>
              <div className='flex flex-col text-center'>
              <p className='font-bold'>Vendidos:</p>
              <p>{item.vendidos}$</p>
              </div>

              <div className='flex flex-col text-center'>
              <p className='font-bold'>Stock:</p>
              <p>{item.stock}$</p>
              </div>
              <div className='flex flex-col text-center'>
              <p className='font-bold'>Total:</p>
              <p>{item.precio * item.vendidos}$</p>
              </div>
             
            </div>
          ))}
        </div>
      </div>

            <div className="flex flex-col text-black items-center border-black border-[2px] p-4 mt-4">
              <h1>Total</h1>
              <p>{dataproducts.totalValue}$</p>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
