export const fetchDatas = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data is :", data);

  if (data == null) {
    return null;
  }else{
    return Object.entries(data);
  }

  
};
