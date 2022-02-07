import { useCallback, useEffect, useState } from "react";
import Axios from "axios";

export const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(true);

  const peticion = useCallback(async () => {
    const key = "client_id=sDtAC43ZnBxnNYFFgJuVLtxkGMJRR7AlVPm1-rZG8hs";

    let route = `https://api.unsplash.com/photos/?${key}`;

    if (input !== "") {
      route = `https://api.unsplash.com/search/photos/?query=${encodeURI(
        input
      )}&${key}`;
    }

    setLoading(true);

    const { data } = await Axios.get(route);

    if (data) {
      setImages(data);
    } else {
      setImages([]);
    }

    setLoading(false);
  }, [input]);

  useEffect(() => {
    peticion();
  }, [peticion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target[0].value;

    setInput(text);
  };

  return [images, loading, handleSubmit];
};
