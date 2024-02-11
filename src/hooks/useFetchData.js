import { useEffect } from "react";
import { useState } from "react";

export function useFetchData(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:3000/meals");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "failed to fetch the data");
        }

        setData(data);
      } catch (error) {
        setError(error.message || "failed to fetch the data");
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    setData,
  };
}
