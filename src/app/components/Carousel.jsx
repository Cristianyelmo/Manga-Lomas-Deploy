import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import "slick-carousel/slick/slick-theme.css";
import { ProductHook } from "../context/ProductContext";

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;

   
    return (
        
      <div
        className=" bg-black rounded-full w-[50px] h-[50px] absolute z-20 bottom-[50%] left-0"
        onClick={onClick}
      >
        <Image
     src="/icons/berserkSvg.svg"
     height={50}
     width={50}
  className=" transform scale-x-[-1]"
   />
      </div>
    );
  }
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    
    return (
        <div
        className=" bg-black rounded-full w-[50px] h-[50px] absolute z-20 bottom-[50%] right-0"
        onClick={onClick}
      >
   <Image
     src="/icons/berserkSvg.svg"
     height={50}
     width={50}
 
   />

      </div>
    );
  }
 
function Carousel({arrayProductos}) {
  const [display, setDisplay] = useState(true);

  console.log(arrayProductos)
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1536, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024, // a partir de este ancho de pantalla
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640, // a partir de este ancho de pantalla
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  ,
    nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
  };
  const {ChangePage} = ProductHook()
  return (
    <div className="slider-container flex justify-center relative">
 
    
      <div
        style={{
         
          display: display ? "block" : "none"
        }}
        className="w-[300px] sm:w-[500px] lg:w-[900px]"
      >
        <Slider {...settings}>
          
    { arrayProductos &&  arrayProductos.map((item,index)=>(  
      
      
      
      <div className="relative cursor-pointer" key={index}>
     {/*  <Image
        src="/imagen/pokemon.webp"
        width={50}
        height={50}
        ref={(el) => (movableDivRef.current[index] = el)}
        className={`w-[50px] h-[50px] bg-black border-black border-[4px] rounded-full right-0 absolute z-50 move-${index}`}
        onClick={()=>AddCart(index,item.id,item.precio)}
      /> */}
      <div className="absolute z-40 bottom-[20%] left-[10%]">
        <div className="relative">
          <div className="absolute z-20 bg-white h-[70px] w-[150px] text-center space-y-2 content-center border-[4px] border-black p-2">
            <p className="text-xs text-black truncate">{item.nombre}</p>
            <p className="text-xs text-black truncate">{item.precio}$</p>
          </div>
        </div>
      </div>
      <div className="relative mt-6 ">
        <Image
          onClick={() => ChangePage(item.id, "Producto")}
          src={`/productos/${item.image}`}
          height={400}
          width={213}
          className="border-[4px] border-black z-20 relative"
        />
        <div className="border-[4px] border-black h-[300px] w-[213px] bg-black z-10 absolute left-[4%] bottom-[-3%]"></div>
      </div>
    </div>



))}
 


         
        </Slider>

     
      </div>
    </div>
  );
}

export default Carousel;
