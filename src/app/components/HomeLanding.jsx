"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ProductHook } from "../context/ProductContext";
import Preloader from "./Preloader";

export default function HomeLanding() {
  const {
    moveDiv,
    targetDivRef,
    movableDivRef,
    move,
    setMove,
    keyframes,
    SetStatePage,
   
    AddCart,
    setKeyframes,
    SetidCategory,
    dataproducts,
    setDataProducts,
    Preloading,
    setPreloading,
    ChangePage,
    hoveranime, SethoverAnime
  } = ProductHook();

  

 



  if (Preloading) {
    return <Preloader />
  }

  return (
    <div className="text-black">
      <style>{keyframes}</style>

      <section className="lg:h-[500px] space-y-2  w-full  mt-4 flex flex-col md:flex-row md:space-x-2 md:space-y-0 lg:flex-row lg:space-x-2 lg:space-y-0">
        <div className="flex flex-col space-y-2 h-full sm:h-[350px] lg:h-[500px] w-[100%] lg:w-[50%]">
          <div className="relative h-[50%] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
             onClick={() => ChangePage(4,"Category")}
          onMouseEnter={() =>SethoverAnime((prevState) => ({
            ...prevState,
            furry:true,
          }))}
          onMouseLeave={() =>SethoverAnime((prevState) => ({
            ...prevState,
            furry:false,
          }))}>
            <Image
              src="/imagen/Figuras de Accion.svg"
              height={250}
              width={170}
              className={`absolute sm:w-[200px] lg:w-[270px] z-30 top-[50%] ml-4  transition-transform duration-300 ease-linear ${
                hoveranime.furry ? "rotate-12 scale-110" : "rotate-0 scale-1"
              }`}
            />

            <Image
              src="/imagen/Figuras de Accion-1.webp"
              height={338}
              width={195}
              className={`absolute sm:w-[150px] lg:w-[210px] right-0 z-40 left-[55%] sm:left-auto  bottom-0  transition-transform duration-300 ease-linear ${
                hoveranime.furry ? "rotate-6 " : "rotate-0"
              }`}
            />
            <Image
              src="/imagen/Figuras de Accion-0.webp"
              height={338}
              width={195}
              className="absolute sm:w-[150px] lg:w-[210px] right-0 z-30 left-[55%]  sm:left-auto    bottom-0  "
            />
            <Image
              src="/imagen/fondoCategory.png"
              height={1920}
              width={1603}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="relative h-[50%] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
          onClick={() => ChangePage(2,"Category")}
           onMouseEnter={() =>SethoverAnime((prevState) => ({
            ...prevState,
            naruto:true,
          }))}
          onMouseLeave={() =>SethoverAnime((prevState) => ({
            ...prevState,
            naruto:false,
          }))}>
          
          
          
            <Image
              src="/imagen/Accesorios.svg"
              height={250}
              width={170}
              className={`absolute md:w-[180px] sm:w-[250px]  z-30 lg:w-[270px] top-[50%] ml-4   transition-transform duration-300 ease-linear ${
                hoveranime.naruto ? "rotate-12 scale-110" : "rotate-0 scale-1"
              }`}
            />

            <Image
              src="/imagen/Accesorios-1.webp"
              height={300}
              width={248}
              className={`absolute z-30 sm:w-[200px] right-0  left-[55%]  sm:left-auto  eyes-onepunch `}
              style={{ top: hoveranime.naruto ? "-5px" : "0px" }}
            />
            <Image
              src="/imagen/Accesorios-0.webp"
              height={300}
              width={248}
              className={`absolute z-20 right-0  left-[55%]  sm:left-auto   sm:w-[200px]  transition-transform duration-300 ease-linear ${
                hoveranime.naruto ? "rotate-6 " : "rotate-0 "
              }`}
            />

            <Image
              src="/imagen/fondoCategory.png"
              height={1920}
              width={1603}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </div>
        <div className="flex flex-col space-y-2 h-full sm:h-[350px] lg:h-[500px] w-[100%] lg:w-[50%]">
          <div
            className="relative h-[65%] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
            onClick={() => ChangePage(1,"Category")}
            onMouseEnter={() =>SethoverAnime((prevState) => ({
              ...prevState,
              onePunch:true,
            }))}
            onMouseLeave={() =>SethoverAnime((prevState) => ({
              ...prevState,
              onePunch:false,
            }))}
          >
            <Image
              src="/imagen/Mangas.svg"
              height={250}
              width={170}
              className={`absolute z-30 top-[50%] lg:w-[270px] ml-4  transition-transform duration-300 ease-linear ${
                hoveranime.onePunch ? "rotate-12 scale-110" : "rotate-0 scale-1"
              }`}
            />

            <Image
              src="/imagen/Mangas-1.webp"
              height={1070}
              width={620}
              className={`absolute z-40 left-[35%] eyes-onepunch h-full`}
              style={{ top: hoveranime.onePunch ? "-5px" : "0px" }}
            />
            <Image
              src="/imagen/Mangas-0.webp"
              height={1070}
              width={620}
              className="absolute z-30 left-[35%] h-full"
            />
            <Image
              src="/imagen/fondoCategory.png"
              height={1920}
              width={1603}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>

          <div className="relative h-[35%] border-black border-[4px] bg-category overflow-hidden cursor-pointer"
            onClick={() => ChangePage(3,"Category")}
          onMouseEnter={() =>SethoverAnime((prevState) => ({
            ...prevState,
            onepiece:true,
          }))}
          onMouseLeave={() =>SethoverAnime((prevState) => ({
            ...prevState,
            onepiece:false,
          }))}>
            <Image
              src="/imagen/Posters.svg"
              height={250}
              width={170}
              className={`absolute sm:w-[250px] md:w-[200px] z-30 top-[50%] lg:w-[270px] ml-4  transition-transform duration-300 ease-linear ${
                hoveranime.onepiece ? "rotate-12 scale-110" : "rotate-0 scale-1"
              }`}
            />
            <Image
              src="/imagen/Posters-1.webp"
              height={200}
              width={186}
              className={`absolute z-40 right-0 lg:top-[8%] eyes-onepunch bottom-0`}
              style={{ top: hoveranime.onepiece ? "-4px" : "" }}
            />
            <Image
              src="/imagen/Posters-0.webp"
              height={200}
              width={186}
              className="absolute z-30 right-0 lg:top-[8%] bottom-0"
            />
            <Image
              src="/imagen/fondoCategory.png"
              height={1920}
              width={1603}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </div>
      </section>
















      <section className="lg:h-[421px] h-[321px]  relative w-full mt-4 border border-[5px] border-black overflow-hidden">
        <div className="flex absolute z-30 inset-0 m-auto w-fit h-fit space-x-5 animate-berserk4 ">
          <Image
            src="/imagen/berserkManga.jpg"
            height={300}
            width={600}
            className=" w-[113px] lg:w-[213px] sm:w-[200px] ml-2 lg:ml-0"
          />

          <div className="text-white lg:text-3xl flex flex-col space-y-2 items-center self-center ">
            <p className="text-white ">Berserk #12</p>
            <p>Disponible en:</p>
            <Image
              src="/imagen/mangaLomasBerserk.webp"
              height={421}
              width={300}
              className="  "
            />
          </div>
        </div>

        <p className="absolute inset-0 m-auto w-fit h-fit text-center text-white text-2xl z-40 animate-berserk2">
          El eclipse ha comenzado...
        </p>
        <div className="w-[90px] h-[90px] bg-black rounded-full absolute z-20 left-[50%] top-[-10%] animate-berserk"></div>
        <Image
          src="/imagen/berserk1.webp"
          height={421}
          width={1348}
          className="absolute z-30 animate-berserk3 bottom-0 scaled-image"
        />
        <Image
          src="/imagen/berserk.webp"
          height={421}
          width={1348}
          className="w-full h-full object-cover"
        />
      </section> 




      <section className="mt-5 mb-10 space-y-10">
        <h1 className="text-center text-4xl mb-5">Productos</h1>
        <section className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 space-y-4 justify-items-center ">
      {dataproducts &&
        dataproducts.products.map((item, index) => (
          <div  className="relative cursor-pointer" key={index}>
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
                <div className="absolute z-20 bg-white h-[70px] w-[150px] text-center space-y-2 content-center border-[4px] border-black p-2">
                  <p className="text-xs truncate">{item.nombre}</p>
                  <p className="text-xs">{item.precio}$</p>
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
    </section>
      </section>






      <section className="lg:h-[400px] h-[800px] flex lg:flex-row flex-col mt-4 space-y-2 lg:space-y-0 lg:space-x-2">
        <div className="relative lg:w-[85%] w-[100%] h-[50%] lg:h-[100%] border border-[5px] border-black overflow-hidden">
          <div className="absolute z-40">
            <div className="relative">
              <div className="absolute z-20 bg-white lg:h-[90px] lg:w-[200px] h-[80px] w-[180px]  border-[5px] border-black p-2 m-2">
                <p className="text-sm">
                  Cuando no tenes plata para pagar tus mangas...
                </p>
              </div>

              <div className="absolute z-10 bg-black mt-[13px] ml-[15px] lg:h-[90px] lg:w-[200px] h-[80px] w-[180px]  border-[5px] border-black p-2 m-2"></div>
            </div>
          </div>
          <Image
            src="/imagen/yugi-oh3.webp"
            height={351}
            width={350}
            className="absolute z-30 right-0 bottom-0 animate-yugioh2 "
          />
          <Image
            src="/imagen/yugi-oh.webp"
            height={501}
            width={400}
            className="absolute z-30 right-0 bottom-0  animate-yugioh3"
          />

          {/*  <Image src="/imagen/yugi-oh2.webp" height={501} width={500} className="absolute z-20 right-0  animate-yugioh2" /> */}

          <Image
            src="/imagen/fondo.jpeg"
            height={1920}
            width={1603}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative w-[100%] lg:w-[15%] h-[50%] lg:h-[100%] border border-[5px] border-black overflow-hidden bg-black">
          <Image
            src="/imagen/vegeta8mil3.webp"
            height={421}
            width={1348}
            className="w-full h-full absolute animate-vegeta8mil3 "
          />
          <Image
            src="/imagen/vegeta8mil2.webp"
            height={421}
            width={1348}
            className="w-full h-full absolute   z-20 animate-vegeta8mil"
          />

          <Image
            src="/imagen/vageta8mil.webp"
            height={421}
            width={1348}
            className="w-full h-full absolute animate-vegeta8mil2 "
          />
        </div>
      </section>
    </div>
  );
}
