export const fetchDatas = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data is :", data);

  return Object.entries(data);
};
