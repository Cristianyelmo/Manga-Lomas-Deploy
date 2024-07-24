"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/navigation";
import Preloader from "../components/Preloader";
import { UserHook } from "../context/UserContext";
import { MyShopping } from "../services/Shopping.service";
import Profile from "../components/User/Profile";
import ProductList from "../components/User/ProductList";
import Rating from "../components/User/Rating";
export default function User() {
  const {
    handlePostComment,
    RatingView,
    handleComment,
    ratingobject,
    setRatingObject,
    datauser,
    setDataUser,
    Preloading,
    setPreloading,
    handleFechaChange,
    selectedFecha,
    setSelectedFecha,
    dinamicUser,
    setDinamicUser,
    DinamicUserRating,
    date,
    setDate,
    DateOption,
    handleClick,
    dinamicRating,
    setDinamicRating,
    comentarios,
    setComentario,
  } = UserHook();

  useEffect(() => {
    const GetMyShopping = async () => {
      try {
        const result = await MyShopping("Todos");
        setDataUser(result);
      } catch (error) {
        console.error;
      } finally {
        setPreloading(false);
      }
    };

    GetMyShopping();
  }, []);
  if (Preloading) {
    return <Preloader />;
  }

  const totalValue = datauser.producto.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.total;
  }, 0);

  return (
    <>
    
        
        <main className="bg-[#F3F3F3] lg:px-12 lg:py-12 px-6 py-4 relative overflow-hidden">
        <Header clickHeader={handleClick} />
        <div className="flex justify-center text-black space-x-10">
          <div>
            <h1 onClick={DinamicUserRating} className="cursor-pointer">
              Mis datos personales
            </h1>
            {dinamicUser && <div className="h-[4px] w-full bg-black"></div>}
          </div>

          <div>
            <h1
              onClick={() => setDinamicUser(false)}
              className="cursor-pointer"
            >
              Mis compras
            </h1>
            {!dinamicUser && <div className="h-[4px] w-full bg-black"></div>}
          </div>
        </div>

        {dinamicUser ? (
          <Profile />
        ) : !dinamicRating ? (
          <ProductList
            selectedFecha={selectedFecha}
            handleFechaChange={handleFechaChange}
            datauser={datauser}
            DateOption={DateOption}
            RatingView={RatingView}
            totalValue={totalValue}
          />
        ) : (
          <Rating
            ratingobject={ratingobject}
            setDinamicRating={setDinamicRating}
            comentarios={comentarios}
            handleComment={handleComment}
            handlePostComment={handlePostComment}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
