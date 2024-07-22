"use client"
import React, { useState } from 'react';
import Image from 'next/image'; 
import { ProductHook } from '@/app/context/ProductContext';
import { UserHook } from '@/app/context/UserContext';

const Rating = ({ratingobject,setDinamicRating,comentarios,handleComment,handlePostComment}) => {
const {ratingselected,setRatingSelected,ClickRating,resultsum, setResultsum,TotalRating,errors} = UserHook()



console.log(errors)



  return (
    <div>
            <section className="lg:h-[500px] grid lg:grid-cols-2  grid-cols-1 gap-5 w-full py-4  ">
              <div className="relative border-[4px] h-[500px] lg:h-[100%] border-black ">
                <div className=" absolute inset-0 flex flex-col items-center justify-center">
                  <div className="relative">
                    <div className="relative">
                      <Image
                        src={`/productos/${ratingobject.image}`}
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

              <div className="text-black ">
                <div className="flex justify-between mb-2">
                  <div>
                    <h1>Calificacion:</h1>
                    <div className="flex space-x-2">
                    {ratingselected.map((item,index) => (
  <div key={item.id} onClick={()=>ClickRating(index)} className='cursor-pointer'> 
    {item.rating == true ? (
      <Image src="/imagen/Rating1.svg" height={30} width={30} />
    ) : (
      <Image src="/imagen/Rating0.svg" height={30} width={30} />
    )}
  </div>
))}
                    </div>
                  </div>
                  <button
                    className="bg-black text-white p-3"
                    onClick={() => setDinamicRating(false)}
                  >
                    Volver
                  </button>
                </div>
                <h1>Comentario:</h1>

                <div className="relative ">
                  <div className="border-[4px] border-black h-[190px] w-full bg-black absolute left-[2%] bottom-[-5%] z-10"></div>
                  <textarea
                    value={comentarios}
                    onChange={handleComment}
                    placeholder="escribe que te parecio"
                    type="text"
                    className="p-2 border-black border-[3px] h-[190px] w-full z-20 relative text-black focus:outline-none"
                  />
                </div>
                <div className="flex justify-end m-4">
                  <button
                    className="bg-black p-4 text-white flex "
                    onClick={handlePostComment}
                  >
                    Enviar
                  </button>
                </div>
                {errors && errors.map((item,index)=>(
                  <p key={index}>{item}</p>
                ))}
              </div>
            </section>
          </div>
  );
};

export default Rating;