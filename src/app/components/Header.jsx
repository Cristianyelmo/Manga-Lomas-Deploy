"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductHook } from "../context/ProductContext";
import { useRouter } from "next/navigation";
import {
  BuyShoppingCart,
  GetShoppingCart,
  ShoppingCartAddLess,
} from "../services/Shopping.service";

export default function Header({ clickHeader }) {
  const {
    handleClickUser,
    viewcart,
    setViewCart,
    AddLess,
    buyCart,
    GetshoppingCart,
    dataShoppinCart,
    setDataShoppinCart,
    targetDivRef,
    HeaderCart,
    SetStatePage,
    indexCart,
    DeleteCart,
    Preloading,
    setPreloading,
    thanksbuy,setThanksBuy,
    handleClickAdmin
    
  } = ProductHook();

  useEffect(() => {
    setPreloading(true);
    const GetshoppingCart = async () => {
      try {
        const shoppingcart = await GetShoppingCart();
        setDataShoppinCart(shoppingcart);
      } catch (error) {
        console.error;
      } finally {
        setPreloading(false);
      }
    };

    GetshoppingCart();
  }, []);

 

  const ThanksBuy = ()=>{
    setViewCart(false);
    setThanksBuy(true)
    const audio = new Audio('/sound/arigato.mp3');
    audio.play();
    setTimeout(() => {
      setThanksBuy(false)
    }, 3000);
  }
 const [clickuseradmin,setClickUserAdmin]=useState(false)
 const handleToggle = () => {
  setClickUserAdmin(prevState => !prevState);
};
  return (
    
    <div className="py-4">
   
      <div

        className={`bg-[#F3F3F3] p-4 w-[90%] md:w-[50%] sm:w-[70%] lg:w-[30%] h-screen absolute z-50 top-0 right-0 transition-transform transform ${
          viewcart ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="text-black text-2xl">Carritos</h1>
        <button className="text-black " onClick={() => setViewCart(false)}>
        <Image
                src="/icons/close.svg"
                width={20}
                height={20}
                className="cursor-pointer"
               
              />
        </button>
        </div>
        <div className="space-y-2">
        {dataShoppinCart &&
  dataShoppinCart.producto.map((item, index) => (
    <div key={index} className="flex justify-between items-center space-x-4 p-2 border-b">
      <div className="relative">
        <Image
          src={`/productos/${item.productos.image}.webp`}
          height={200}
          width={63}
          className="border-[4px] border-black z-20 relative"
        />
      </div>
      <div className="flex flex-col items-center w-1/3">
        <div className="flex justify-center w-full">
          <p className="truncate w-full text-black text-center" title={item.productos.nombre}>{item.productos.nombre}</p>
        </div>
        <div className="flex border-black border-[3px] justify-between p-1 px-2 w-[100px]">
          <button
            onClick={() =>
              AddLess(
                item.id,
                false,
                item.cantidad,
                item.fecha,
                item.total,
                item.id_usuario,
                item.id_producto,
                item.compra
              )
            }
            className="text-2xl text-black"
          >
            -
          </button>
          <p className="text-black">{item.cantidad}</p>
          <button className="text-2xl text-black"
            onClick={() =>
              AddLess(
                item.id,
                true,
                item.cantidad,
                item.fecha,
                item.total,
                item.id_usuario,
                item.id_producto,
                item.compra
              )
            }
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center text-black">
        <Image
          src="/icons/DeleteIcon.svg"
          width={50}
          height={50}
          className="cursor-pointer"
          onClick={() => DeleteCart(item.id)}
        />
        <p>{item.productos.precio}$</p>
      </div>
    </div>
  ))}

          </div>
         
        {dataShoppinCart && dataShoppinCart.producto && dataShoppinCart.producto.length !== 0 ? (
           <><div className="mt-10 text-black flex justify-between text-2xl ">
            
            <p>Total:</p>
            <p>{dataShoppinCart && dataShoppinCart.totalValue ? dataShoppinCart.totalValue : 0}$</p>
      </div>
          <button className="bg-black p-4 text-white mt-10 w-full" onClick={buyCart}>
            Realizar Compra
          </button>
          </>
        ): (<div className="text-black flex flex-col items-center space-y-2 p-4">
          <Image
            src="/imagen/empty.webp"
            width={200}
            height={200}
         
          /> 
         <p> No hay nada en el carrito...</p></div>)}


{/* <button className="bg-black p-4 text-white" onClick={ThanksBuy}>
            Comprar prueba
          </button>   */}
      </div>
      
      <header ref={HeaderCart} className="cursor-pointer bg-[#F3F3F3]">


        
        <section className="flex justify-between ">
          <div
            className="text-black flex flex-col items-center mt-6 relative"
           
          >
            <div className="bg-black border-black border-[3px] w-[50px] h-[50px] rounded-full " onClick={handleToggle}>
            <Image src="/imagen/perfil.svg" height={400} width={213} />
            </div>
          
{clickuseradmin && <div className="bg-white p-3 border-[3px] border-black absolute mt-[40%] ml-[80%] z-20" >
  <p  onClick={handleClickUser}>Usuario</p>
  <p onClick={handleClickAdmin} >Admin</p>
</div>}




          </div>
          <Image
            src="/imagen/mangalomas.svg"
            width={200}
            height={500}
            onClick={clickHeader}
            className="lg:w-[500px] mt-3 sm:w-[400px]"
          />
          <div className="relative" onClick={() => setViewCart(true)}>
      <Image
        src="/imagen/cart.svg"
        width={50}
        height={50}
        ref={targetDivRef}
        className="absolute mt-0 top-[50%]"
      />
      <Image
        src="/imagen/pikachu.webp"
        width={60}
        height={60}
        className={` animatecart-${indexCart} ${thanksbuy && 'animatecart'}`}
      />
    </div>
        </section>
      </header>
    </div>
  );
}
