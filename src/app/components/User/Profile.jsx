"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
;
export default function Profile() {
 

  return (
    <section className="grid lg:grid-cols-2  grid-cols-1 gap-20">
            <div className="flex flex-col text-black items-center self-center">
              <Image src="/imagen/perfil.svg" height={400} width={213} />
              <h1>Kat</h1>
            </div>

            <div className="flex flex-col space-y-10 text-black ">
              <div className="relative ">
                <h1>Correo</h1>
                <div className="border-[4px] border-black h-[50px] w-full bg-black absolute left-[2%] bottom-[-20%] z-10"></div>
                <input
                  type="text"
                  className="p-2 border-black border-[3px] h-[50px] w-full z-20 relative text-black focus:outline-none"
                />
              </div>
              <div className="relative">
                <h1>Nombre</h1>
                <div className="border-[4px] border-black h-[50px] w-full bg-black absolute left-[2%] bottom-[-20%] z-10"></div>
                <input
                  type="text"
                  className="p-2 border-black border-[3px] h-[50px] w-full z-20 relative text-black focus:outline-none"
                />
              </div>
              <div className="relative">
                <h1>Password</h1>
                <div className="border-[4px] border-black h-[50px] w-full bg-black absolute left-[2%] bottom-[-20%] z-10"></div>
                <input
                  type="text"
                  className="p-2 border-black border-[3px] h-[50px] w-full z-20 relative text-black focus:outline-none"
                />
              </div>
              <button className="bg-black p-4 w-[50%] text-white">
                Guardar cambios
              </button>
            </div>
          </section>
  );
}
