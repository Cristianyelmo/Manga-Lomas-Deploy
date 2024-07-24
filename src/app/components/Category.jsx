"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductHook } from "../context/ProductContext";
import Preloader from "./Preloader";
import { GetCategory } from "../services/Products.service";

export default function Category() {
  const {
    idPage,
    Preloading,
    setPreloading,
    RefreshCategory,
    datacategory,
    setDatacategory,
    movableDivRef,
    AddCart,
    ChangePage,
    keyframes,
    selectedSub,
    ChangeSubSelection
  } = ProductHook();

  useEffect(() => {
    const Getcategory = async () => {
      setPreloading(true);
      try {
        const categoryProducts = await GetCategory(idPage, 0);
        setDatacategory(categoryProducts);
      } catch (error) {
        console.error;
      } finally {
        setTimeout(() => {
          setPreloading(false);
        }, 1000);
      }
    };

    Getcategory();
  }, []);








  if (Preloading) {
    return <Preloader />;
  }

  return (
    <div className="">
           <style>{keyframes}</style>
      <section className="relative h-[200px] border-black border-[4px] bg-category overflow-hidden cursor-pointer">
        <Image
          src={`/imagen/${datacategory && datacategory.categoria.nombre}.svg`}
          height={250}
          width={170}
          className={`absolute lg:w-[270px] z-30 top-[50%] ml-4  transition-transform duration-300 ease-linear `}
        />

        <Image
          src={`/imagen/${datacategory && datacategory.categoria.nombre}-1.webp`}
          height={1040}
          width={120}
          className={`absolute lg:w-[320px] z-40 right-0 bottom-0 h-full  eyes-onepunch`}
        />
        <Image
          src={`/imagen/${datacategory && datacategory.categoria.nombre}-0.webp`}
          height={1040}
          width={120}
          className="absolute lg:w-[320px] z-30 right-0  bottom-0 h-full "
        />
        <Image
          src="/imagen/fondoCategory.png"
          height={1920}
          width={1603}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </section>
      <section className="mt-4">
      
      {datacategory && 
       
datacategory.subcategorias.length !== 0 &&
<>
        <h1 className="text-center text-3xl text-black m-10 ">Categorias</h1>
       <div className="grid lg:grid-cols-2 grid-cols-1 md:grid-cols-2 md:gap-5 gap-10 w-full">
          <div
            className="relative h-[130px] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
            onClick={() => RefreshCategory(0,3)}
          >
            <Image
              src={`/imagen/Todos.svg`}
              height={250}
              width={170}
              className="absolute lg:w-[270px] z-30 top-[20%] ml-4 transition-transform duration-300 ease-linear"
            />
            <Image
                src={`/imagen/${datacategory && datacategory.categoria.nombre}-1.webp`}
              height={950}
              width={130}
              className="absolute lg:w-[270px] z-40 right-0 bottom-0 h-full eyes-onepunch"
            />
            <Image
              src={`/imagen/${datacategory && datacategory.categoria.nombre}-0.webp`}
              height={950}
              width={130}
              className="absolute lg:w-[270px] z-30 right-0 bottom-0 h-full"
            />
            <Image
              src="/imagen/fondoCategory.png"
              height={1920}
              width={1603}
              className="w-full h-full object-cover"
            />
            <div   className={`absolute inset-0 ${selectedSub[3].subcategoria ? 'bg-black' :'bg-black bg-opacity-50'} `}></div>
          </div>
          {datacategory &&
            datacategory.subcategorias.map((item,index) => (
              <div key={index}
                className="relative h-[130px] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
                onClick={() => RefreshCategory(item.id,index)}
              >
                <Image
                  src={`/imagen/${item.nombre}.svg`}
                  height={250}
                  width={170}
                  className="absolute lg:w-[270px] z-30 top-[20%] ml-4 transition-transform duration-300 ease-linear"
                />
              {/*   <Image
                  src="/imagen/Seinen-0.webp"
                  height={950}
                  width={170}
                  className={`absolute z-40 right-0 bottom-0 h-full eyes-onepunch ${!selectedSub[index].subcategoria && 'hidden'}`}
                /> */}
                <Image
                  src={`/imagen/${item.nombre}-1.webp`}
                  height={950}
                  width={100}
                  className="absolute lg:w-[170px] z-30 right-0 bottom-0 h-full"
                />
                <Image
                  src="/imagen/fondoCategory.png"
                  height={1920}
                  width={1603}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${selectedSub[index].subcategoria ? 'bg-black' :'bg-black bg-opacity-50'}`}></div>
              </div>
            ))}
        </div>
        </>
        }

        <div className="mb-10 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 justify-items-center space-y-6 mt-10 ">
          {datacategory &&
            datacategory.categoria.productos.map((item,index) => (
              <div key={index}  className="relative cursor-pointer">
                 <Image
              src="/imagen/pokemon.webp"
              width={50}
              height={50}
              ref={(el) => (movableDivRef.current[index] = el)}
              className={`w-[50px] h-[50px] bg-black border-black border-[4px] rounded-full right-0 absolute z-50 move-${index}`}
              onClick={()=>AddCart(index,item.id,item.precio)}
            />
                <div className="absolute z-40 bottom-[20%] left-[10%]">
                 
                  <div className="relative">
                    <div className="absolute z-20 bg-white h-[70px] w-[150px] text-center space-y-2 content-center border-[4px] border-black p-2 m-2">
                      <p className="text-xs text-black truncate">{item.nombre}</p>
                      <p className="text-xs text-black truncate">{item.precio}$</p>
                    </div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <Image
                   onClick={() => ChangePage(item.id, "Producto")}
                  src={`/productos/${item.image}.webp`}
                    height={400}
                    width={213}
                    className="border-[4px] border-black z-20 relative"
                  />
                  <div className="border-[4px] border-black h-[300px] w-[213px] bg-black z-10 absolute left-[4%] bottom-[-3%]"></div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
