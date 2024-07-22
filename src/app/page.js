'use client'
import Image from "next/image";
import { useEffect } from "react";
import Header from "./components/Header";
import HomeLanding from "./components/HomeLanding";
import Preloader from "./components/Preloader";
import Footer from "./components/Footer";
import { ProductHook } from "./context/ProductContext";
import Category from "./components/Category";
import Producto from "./components/Producto";

export default function Home() {


const {statePage,setKeyframes,SetStatePage,thanksbuy,RefreshCategory} = ProductHook()
const handleClick = () => {
 SetStatePage('Home');
 RefreshCategory(0,3)
};

  return (
    <>
    
    <main className="bg-[#F3F3F3] lg:px-12 lg:py-12 px-6 py-4 relative overflow-hidden ">
   
   
   {thanksbuy &&( 
     <>
     <div className="fixed inset-0 flex items-center justify-center z-50 animate-thanksbuy-image">
     
     <Image src="/imagen/ThanksBuy.webp" width={400} height={400} />

     <Image src="/imagen/onomatopoeia.webp" className="absolute left-[55%] animate-thanksbuy-image-ono " width={100} height={100} />
     <Image src="/imagen/onometopoeiaa.webp" className="absolute right-[55%] animate-thanksbuy-image-ono " width={100} height={100} />    
   </div>


 
    
    <div className={`fixed inset-0 bg-black  animate-thanksbuy  z-40`}>
   
   </div>
    </>
   )
  
   }
 <Header clickHeader={handleClick}/>
 {statePage === 'Home' ? (
  <HomeLanding />
) : statePage === 'Category' ? (
  <Category />
): (
  <Producto />
)}
    </main>

  
  <Footer/>
  </>
  );
}
