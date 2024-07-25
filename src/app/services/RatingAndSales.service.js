const url = "https://manga-lomas-deploy.vercel.app/api/";
export const GetSales = async (date) => {
  const response = await fetch(`${url}Sales?fecha=${date}`);

  const result = await response.json();
  return result;
};

export const AddRating = async (CalificacionObject) => {
  const response = await fetch(`${url}AddRating`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(CalificacionObject),
  });

  const data = await response.json();
  return data;
};
