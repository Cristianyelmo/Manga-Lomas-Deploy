"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { AddShoppingCart, DeleteShoppingCart, GetShoppingCart, MyShopping, ShoppingCartAddLess } from "../services/Shopping.service";
import { GetCategory, GetProducts } from "../services/Products.service";
import { useRouter } from "next/navigation";
import { AddRating } from "../services/RatingAndSales.service";

export const UserContext = createContext(null);

export const UserHook = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {




  const [ratingobject,setRatingObject] = useState({
    image: '',
    id_compra: '',
    id_producto: '',
    id_usuario: '',
    comentarios: '',
    calificacion: 0
  })
  const [comentarios,setComentario]=useState('')
  
  const handleComment = (event) => {
    setComentario(event.target.value)
    setRatingObject((prevObject) => ({
      ...prevObject,
      comentarios: event.target.value,
    }));
   
  };
  const RatingView = (image,id_compra,id_producto,id_usuario)=>{
    setDinamicRating(true) 
    setRatingObject({
    image,
    id_compra,
     id_producto,
     id_usuario,
     comentarios,
     calificacion:3
  
    })
  
  }



  const [errors, setErrors] = useState([]);
  
  const handlePostComment = async() =>{
   
 

const errorsarray = []
  if (comentarios.trim() === '') {
    errorsarray.push('El campo no puede estar vacío');
  }

  if(resultsum == 0){
    errorsarray.push('La calificacion no puede quedar vacia');
  }
  console.log(resultsum)
  setErrors(errorsarray)

if(errorsarray.length == 0){
    const RatingObject = {
      id_compra:ratingobject.id_compra,
      id_producto:ratingobject.id_producto,
      id_usuario:ratingobject.id_usuario,
      comentario:ratingobject.comentarios,
      calificacion:resultsum
    }
    

      try {
      await AddRating(RatingObject) 
       const result = await MyShopping("Todos");
        setDataUser(result);
        setSelectedFecha('Todos')
      } catch (error) {
        console.error
      }finally{
        setDinamicRating(false) ;
        setErrors([])
        setComentario('')
        setRatingSelected([
          {id:0,
            rating:false
          },
          {id:1,
            rating:false
          },
          {id:2,
            rating:false
          },
          {id:3,
            rating:false
          },
          {id:4,
            rating:false
          }
        ])
      }
    }


  }
  const [datauser, setDataUser] = useState(null);
  const [Preloading, setPreloading] = useState(true);



  const [selectedFecha, setSelectedFecha] = useState('Todos');

  const handleFechaChange = (event) => {
 
    setSelectedFecha(event.target.value);
 console.log(selectedFecha)

 const ShoppingFilter = async () => {
  try {
  
    
   
    const result = await MyShopping(event.target.value);
    setDataUser(result);

  } catch (error) {
    console.error
  }finally{
  
      setPreloading(false);

  }
};

ShoppingFilter();

  };



 
  const [dinamicUser,setDinamicUser] = useState(true)
  const router = useRouter();

  const handleClick = () => {
      router.push('/');
  };

  const [dinamicRating,setDinamicRating] = useState(false)
const DinamicUserRating = ()=>{
setDinamicUser(true)
setDinamicRating(false)
}





const [date,setDate]=useState('Todos')
  
  
  const DateOption = (datex)=>{
    setDate(datex)
    console.log(date)
    console.log('neash')
  }

  const[ratingselected,setRatingSelected]=useState([
    {id:0,
      rating:false
    },
    {id:1,
      rating:false
    },
    {id:2,
      rating:false
    },
    {id:3,
      rating:false
    },
    {id:4,
      rating:false
    }
  ])

  const [resultsum, setResultsum] = useState(0);
  const ClickRating = (index) => {
    const result = ratingselected.map((item, idx) => {
      if (item.id == index && (index === 0 || ratingselected[index - 1].rating)) {
        return { ...item, rating: !item.rating };
      } else {
        return item;
      }
    });
  
   
    const suma = result.reduce((acc, item) => {
      return item.rating ? acc + 1 : acc;
    }, 0);
  
    setRatingSelected(result);
    setResultsum(suma);
  };
 
  
/*   const TotalRating = () => {
    const suma = ratingselected.reduce((acc, item) => {
      return item.rating ? acc + 1 : acc;
    }, 0);
 
  setResultsum(suma);
    console.log(ratingselected);
  }; */

  return (
    <UserContext.Provider
      value={{
        handlePostComment,
        RatingView,
        handleComment,
        ratingobject,setRatingObject,
        datauser, setDataUser,
        Preloading, setPreloading,
        handleFechaChange,
        selectedFecha, setSelectedFecha,
        dinamicUser,setDinamicUser,
        DinamicUserRating,
        date,setDate, DateOption,
        handleClick,
        dinamicRating,setDinamicRating,
        comentarios,setComentario,
        ratingselected,
        setRatingSelected,
        ClickRating,
        resultsum, 
        setResultsum,
       
        errors

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
