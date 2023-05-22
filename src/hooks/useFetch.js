import { useState, useEffect } from "react";
import { BASE_URL, CLIENTID, SECRETKEY } from "../utils/config";


const useFetch = url => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [oauthKey, setOauthKey] = useState(null);


  useEffect(() => {
    const fetchOauthKey = async () => {
      try {
        const response = await fetch(`${BASE_URL}/oauth/key`, {
          headers: {
            clientId: CLIENTID,
            secret: SECRETKEY,
          },
        });

        const result = await response.json();
        setOauthKey(result.key);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOauthKey();
  }, [CLIENTID, SECRETKEY]);

    useEffect(() => {
    const fetchData = async () => {
      if (!oauthKey) {
        return;
      }

      setLoading(true);

      try {
        const response = await fetch(url, {
          headers: {
            key: oauthKey,
          },
        });

        if (!response.ok) {
          setError("Failed to fetch");
        }

        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, oauthKey]);

  return {
    data,
    error,
    loading,
  };
};

export default useFetch;