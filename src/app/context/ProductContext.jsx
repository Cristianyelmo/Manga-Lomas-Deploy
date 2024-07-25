"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import {
  AddShoppingCart,
  BuyShoppingCart,
  DeleteShoppingCart,
  GetShoppingCart,
  ShoppingCartAddLess,
} from "../services/Shopping.service";
import {
  GetCategory,
  GetIdProducts,
  GetProducts,
} from "../services/Products.service";
import { useRouter } from "next/navigation";

export const ProductContext = createContext(null);

export const ProductHook = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [move, setMove] = useState(false);
  const [statePage, SetStatePage] = useState("Home");
  const movableDivRef = useRef([]);
  const targetDivRef = useRef();
  const HeaderCart = useRef(null);
  const [keyframes, setKeyframes] = useState("");

  const [indexCart, setIndexCart] = useState();
  const moveDiv = (index) => {
    setIndexCart(index);
    const movableDiv = movableDivRef.current[index];
    console.log(movableDiv);
    const targetDiv = targetDivRef.current;

    const targetRect = targetDiv.getBoundingClientRect();
    const movableRect = movableDiv.getBoundingClientRect();

    const offsetX = targetRect.left - movableRect.left;
    const offsetY = targetRect.top - movableRect.top;

    const keyframesStyle = `
     @keyframes moveToMovable-${index} {
       0% {
         transform: translate(0, 0);
         opacity: 1;
       }
       90% {
         transform: translate(${offsetX}px, ${offsetY}px);
         opacity: 1;
       }
       95% {
         transform: translate(${offsetX}px, ${offsetY}px);
         opacity: 1;
       } 100% {
         transform: translate(${offsetX}px, ${offsetY}px);
         opacity: 0;
       }
     }

     @keyframes cart-${index} {
       0% {
         transform: translateY(0px);
       }
       90% {
         transform: translateY(0px);
       }
       95% {
         transform: translateY(5px);
       }
       100% {
         transform: translateY(0px);
       }
     }
     
     .animatecart-${index} {
      animation: cart-${index} 1s ease-in-out forwards ;
     }
     
     .move-${index} {
       animation: moveToMovable-${index} 1s ease-in-out forwards;
     }
   `;

    setKeyframes(keyframesStyle);
    console.log(keyframesStyle);
    if (HeaderCart.current) {
      HeaderCart.current.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      setKeyframes("");
    }, 1000);
  };

  const GetshoppingCart = async () => {
    try {
      const shoppingcart = await GetShoppingCart();
      setDataShoppinCart(shoppingcart);
    } catch (error) {
      console.error;
    } finally {
    }
  };
  const AddCart = async (index, id, precio) => {
    const today = new Date();
    moveDiv(index);

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const AddCartObject = {
      cantidad: 1,
      fecha: formattedDate,
      total: precio,
      id_usuario: 1,
      id_producto: id,
    };

    console.log(AddCartObject);
    try {
      await AddShoppingCart(AddCartObject);
      await GetshoppingCart();
      setTimeout(() => {
        const audio = new Audio("/sound/untitled.mp3");
        audio.play();
      }, 950);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      throw error;
    }
  };

  const AddCartProduct = async (id, precio) => {
    const today = new Date();

    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;
    const AddCartObject = {
      cantidad: 1,
      fecha: formattedDate,
      total: precio,
      id_usuario: 1,
      id_producto: id,
    };

    try {
      await AddShoppingCart(AddCartObject);
      await GetshoppingCart();
      setTimeout(() => {
        const audio = new Audio("/sound/untitled.mp3");
        audio.play();
      }, 950);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      throw error;
    } finally {
      setAddCart(true);
      setTimeout(() => {
        setAddCart(false);
      }, 900);
    }
  };
  const [addcart, setAddCart] = useState(false);
  const [Preloading, setPreloading] = useState(true);
  const [dataproducts, setDataProducts] = useState(null);
  const [dataproductsforid, setDataProductsforid] = useState(null);
  const [datacategory, setDatacategory] = useState(null);
  useEffect(() => {
    setKeyframes("");
    const GetProductsFetch = async () => {
      try {
        const products = await GetProducts();

        setDataProducts(products);
      } catch (error) {
        console.error;
      } finally {
        setPreloading(false);
      }
    };
    GetProductsFetch();
  }, []);

  const [idPage, SetidPage] = useState();
  const ChangePage = (id, page) => {
    SetStatePage(page);
    SetidPage(id);
    const GetidProducts = async () => {
      try {
        setPreloading(true);
        const products = await GetIdProducts(id);
        setDataProductsforid(products);
      } catch (error) {
        console.error;
      } finally {
        setTimeout(() => {
          setPreloading(false);
        }, 1000);
      }
    };

    GetidProducts();
  };

  const [selectedSub, setSelectedSub] = useState([
    { id: 0, subcategoria: false },
    { id: 1, subcategoria: false },
    { id: 2, subcategoria: false },
    { id: 3, subcategoria: true },
  ]);

  const [dataShoppinCart, setDataShoppinCart] = useState(null);

  const ChangeSubSelection = (id) => {
    const updatedSub = selectedSub.map((item) => {
      if (item.id == id) {
        return { ...item, subcategoria: true };
      } else {
        return { ...item, subcategoria: false };
      }
    });

    setSelectedSub(updatedSub);
  };

  const RefreshCategory = (id, index) => {
    ChangeSubSelection(index);
    const Getcategory = async () => {
      try {
        const categoryProducts = await GetCategory(idPage, id);
        setDatacategory(categoryProducts);
      } catch (error) {
        console.error;
      } finally {
        const audio = new Audio("/sound/delete.mp3");
        audio.play();
      }
    };
    Getcategory();
  };
  const buyCart = async () => {
    console.log(dataShoppinCart.producto);
    try {
      return await BuyShoppingCart(dataShoppinCart.producto);
    } catch (error) {
      console.error;
    } finally {
      GetshoppingCart();
      setViewCart(false);
      setThanksBuy(true);
      const audio = new Audio("/sound/arigato.mp3");
      audio.play();
      setTimeout(() => {
        setThanksBuy(false);
      }, 3000);
    }
  };

  const DeleteCart = async (id) => {
    try {
      return await DeleteShoppingCart(id);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      GetshoppingCart();
      const audio = new Audio("/sound/delete.mp3");
      audio.play();
    }
  };

  const AddLess = async (
    id,
    bool,
    cantidad,
    fecha,
    total,
    id_usuario,
    id_producto,
    compra
  ) => {
    let addless;
    if (bool == true) {
      addless = true;
    }
    if (bool == false) {
      addless = false;
    }

    const ObjectCart = {
      suma: addless,
      cantidad,
      fecha,
      total,
      id_usuario,
      id_producto,
      compra,
    };

    try {
      await ShoppingCartAddLess(id, ObjectCart);
      await GetshoppingCart();
      const audio = new Audio("/sound/delete.mp3");
      audio.play();
    } catch (error) {
      console.error;
    }
  };
  const router = useRouter();
  const [viewcart, setViewCart] = useState(false);
  const handleClickUser = () => {
    router.push("/User");
  };

  const handleClickAdmin = () => {
    router.push("/Admin");
  };

  const [thanksbuy, setThanksBuy] = useState(false);

  const [hoveranime, SethoverAnime] = useState({
    onePunch: false,
    naruto: false,
    onepiece: false,
    furry: false,
  });
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return windowSize;
  }

  const windowSize = useWindowSize();
  const isSmallScreen = windowSize.width <= 1024;

  const handleMouseEnter = (name) => {
    
    if (!isSmallScreen) {
      SethoverAnime(prevState => ({
        ...prevState,
        [name]: true,
      }));
    }
  };

  const handleMouseLeave = (name) => {
    if (!isSmallScreen) {
      SethoverAnime(prevState => ({
        ...prevState,
        [name]: false,
      }));
    }
  };
  return (
    <ProductContext.Provider
      value={{
        moveDiv,
        targetDivRef,
        movableDivRef,
        move,
        setMove,
        keyframes,
        HeaderCart,
        statePage,
        SetStatePage,
        setKeyframes,
        idPage,
        indexCart,
        setIndexCart,
        AddCart,
        dataproducts,
        setDataProducts,
        Preloading,
        setPreloading,
        ChangePage,
        dataproductsforid,
        setDataProductsforid,

        datacategory,
        setDatacategory,
        RefreshCategory,
        DeleteCart,
        dataShoppinCart,
        setDataShoppinCart,
        GetshoppingCart,
        buyCart,
        AddLess,
        viewcart,
        setViewCart,
        handleClickUser,
        thanksbuy,
        setThanksBuy,
        hoveranime,
        SethoverAnime,
        selectedSub,
        setSelectedSub,
        ChangeSubSelection,
        AddCartProduct,
        addcart,
        handleClickAdmin,
        handleMouseLeave,
        handleMouseEnter 
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
