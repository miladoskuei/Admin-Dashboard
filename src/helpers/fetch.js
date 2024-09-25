export const fetchDatas = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log("data is :", data);

  if (data == null) {
    return null;
  } else {
    return Object.entries(data);
  }
};

export const fetchWithTimeout = (url, timeout = 1000) => {
  return Promise.race([
    fetchDatas(url),
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeout)
    ),
  ]);
};
