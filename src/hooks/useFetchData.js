import { useEffect, useState } from "react";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setISLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setISLoading(true);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        setISLoading(false);
      } catch (error) {
        console.error(error);
        setError(error);
        setISLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
