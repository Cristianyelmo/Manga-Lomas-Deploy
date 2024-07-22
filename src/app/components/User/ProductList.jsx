"use client"
import React from 'react';
import Image from 'next/image'; 
import { UserHook } from '@/app/context/UserContext';

const ProductList = ({ selectedFecha, handleFechaChange, datauser, DateOption, RatingView, totalValue }) => {
const {ratingselected} =  UserHook()
  return (
    <section>
      <div className="flex justify-center">
        <div className="text-black flex items-center space-x-4">
          <p>Fecha</p>
          <select
            value={selectedFecha}
            onChange={handleFechaChange}
            className="border-black border-[3px] p-2 flex"
          >
            <option onClick={() => DateOption('Todos')}>Todos</option>
            {datauser && datauser.fechasUnicasArray.map((fecha) => (
              <option key={fecha} onClick={() => DateOption(fecha)}>
                {fecha}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden lg:block border-black border-[2px] p-4">
        <div className="grid grid-cols-7 gap-10 text-black">
          <p>Foto</p>
          <p>Nombre</p>
          <p>Precio</p>
          <p>Cantidad</p>
          <p>Fecha</p>
          <p>Total</p>
          <p>Calificación</p>
        </div>

        <div className="space-y-5">
          {datauser && datauser.producto.map((item,index) => (
            <div  className="grid grid-cols-7 gap-10 text-black" key={index}>
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
              <p>{item.productos.precio}</p>
              <p>{item.cantidad}</p>
              <p>{item.fecha}</p>
              <p>{item.total}$</p>
              {item.Calificacion.length !== 0 ? (
                <div className="flex">
                   {  ratingselected.map((rating,index)=>( 
                  item.Calificacion[0].calificacion   <= index   ?
                  <Image key={index} src="/imagen/Rating0.svg" height={30} width={30} /> :
                  <Image key={index}  src="/imagen/Rating1.svg" height={30} width={30} />
                 ))}
                </div>
              ) : (
                <button
                  className="bg-black text-white p-2 h-[40px]"
                  onClick={() =>
                    RatingView(
                      item.productos.image,
                      item.id,
                      item.id_producto,
                      item.id_usuario
                    )
                  }
                >
                  Calificar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>



      <div className=" p-4 lg:hidden">
        

        <div className="space-y-5">
          {datauser && datauser.producto.map((item,index) => (
            <div key={index}   className="grid grid-cols-1 gap-2 justify-items-center border-black border-[2px] p-4 text-black" >
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
              <p className='font-bold'>Total:</p>
              <p>Total:{item.total}$</p>
              </div>
              {item.Calificacion.length !== 0 ? (
                <div className="flex">
                   {  ratingselected.map((rating,index)=>( 
                  item.Calificacion[0].calificacion   <= index   ?
                  <Image key={index} src="/imagen/Rating0.svg" height={30} width={30} /> :
                  <Image key={index} src="/imagen/Rating1.svg" height={30} width={30} />
                 ))}
                </div>
              ) : (
                <button
                  className="bg-black text-white p-2 h-[40px]"
                  onClick={() =>
                    RatingView(
                      item.productos.image,
                      item.id,
                      item.id_producto,
                      item.id_usuario
                    )
                  }
                >
                  Calificar
                </button>
              )}
            </div>
          ))}
        </div>
      </div>




      <div className="flex flex-col text-black items-center border-black border-[2px] p-4 mt-4">
        <h1>Total</h1>
        <p>{totalValue}$</p>
      </div>
    </section>
  );
};

export default ProductList;