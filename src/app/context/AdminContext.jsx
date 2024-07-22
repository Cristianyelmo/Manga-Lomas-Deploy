"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AddShoppingCart, DeleteShoppingCart, GetShoppingCart, MyShopping, ShoppingCartAddLess } from "../services/Shopping.service";
import { GetCategory, GetProducts } from "../services/Products.service";
import { useRouter } from "next/navigation";
import { AddRating, GetSales } from "../services/RatingAndSales.service";

export const AdminContext = createContext(null);

export const AdminHook = () => {
  return useContext(AdminContext);
};

export const AdminProvider = ({ children }) => {
  const [dataproducts, setDataProducts] = useState(null);
  const [filterProducts, setFilterProducts] = useState("Todos");
  const [Preloading, setPreloading] = useState(true);
  const handleFilterProductChange = (event) => {
    setFilterProducts(event.target.value);
    console.log(filterProducts);

    const FilterProducts = async () => {
      try {
      
       
        const result = await GetProducts(event.target.value);
        setDataProducts(result);
      } catch (error) {
       console.error
      } finally {
        setPreloading(false);
      }
    };

    FilterProducts();
  };



 

  const [datasales, setDataSales] = useState(null);

  

  const [selectedfecha, setSelectFecha] = useState("Todos");
  const handleFechaChange = (event) => {
    setSelectFecha(event.target.value);
    console.log(filterProducts);

    const FilterSales = async () => {
      try {
       

        const result = await GetSales(event.target.value);
        setDataSales(result);
      } catch (error) {
       console.error
      } finally {
        setPreloading(false);
      }
    };

    FilterSales();
  };

  const [dinamicUser, setDinamicUser] = useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };


  const DinamicUserRating = () => {
    setDinamicUser(true);
  
  };

  return (
    <AdminContext.Provider
      value={{
      
        handleFilterProductChange,
        dataproducts, setDataProducts,
        filterProducts, setFilterProducts,
        Preloading, setPreloading,
        datasales, setDataSales,
        selectedfecha, setSelectFecha,
        handleFechaChange,
        dinamicUser, setDinamicUser,
        handleClick,
        DinamicUserRating

      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
