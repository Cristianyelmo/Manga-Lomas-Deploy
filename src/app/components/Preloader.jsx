'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Preloader() {
 


  return (
    <div className="relative h-screen bg-[#F3F3F3]">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image src="/imagen/gokuPreloader.webp" height={100} width={120} /> 
        <section className="flex space-x-2">
        <div className="bg-black w-[30px] h-[30px] rounded-full items-center flex justify-center animate-gokupreloader ">
        <Image src="/imagen/star.svg" height={10} width={10} /> 
        </div>
        <div className="bg-black w-[30px] h-[30px] rounded-full items-center flex justify-center animate-gokupreloader2  ">
        <Image src="/imagen/star.svg" height={10} width={10} /> 
        </div>
        <div className="bg-black w-[30px] h-[30px] rounded-full items-center flex justify-center animate-gokupreloader3">
        <Image src="/imagen/star.svg" height={10} width={10} /> 
        </div>

       
        </section>
        </div>



    </div>
   
 
  );
}