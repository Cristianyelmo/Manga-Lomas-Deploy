const url = "http://localhost:3000/api/";

export const GetShoppingCart = async () => {
  const response = await fetch(`${url}/ShoppingCart`);

  const result = await response.json();
  return result;
};

export const ShoppingCartAddLess = async (id, ObjectCart) => {
  const response = await fetch(`${url}/ShoppingCart/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ObjectCart),
  });
  const result = await response.json();
  return result
};

export const BuyShoppingCart = async (data) => {
  const response = await fetch(`${url}Buy`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  return result;
};

export const AddShoppingCart = async (AddCartObject) => {
  const response = await fetch(`${url}AddShoppingCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(AddCartObject),
  });

  const result = await response.json();

  return result;
};

export const DeleteShoppingCart = async (id) => {
  const response = await fetch(`${url}DeleteShoppingCart/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  return result;
};

export const MyShopping = async (value) => {
  const response = await fetch(`${url}Myshopping?fecha=${value}`);

  const result = await response.json();
  return result;
};
