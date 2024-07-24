const url = "http://localhost:3000/api/";

export const GetProducts = async (filter) => {
  const response = await fetch(`${url}Products?filter=${filter}`);
  const result = await response.json();
  return result
};



export const GetIdProducts = async (productId) => {
  const response = await fetch(`${url}Products/${productId}`);
  const result = await response.json();
  return result;
};

export const GetCategory = async (idcategory, filtersubcategory) => {
  const response = await fetch(
    `${url}Category/${idcategory}?filter=${filtersubcategory}`
  );

  const result = await response.json();
  return result;
};
