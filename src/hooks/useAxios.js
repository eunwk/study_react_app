/*useAxios.js*/
import defaultAxios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (opts, azxiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const [trigger, setTrigger] = useState(0);
  const refetch = () => {
    setState({
      ...state,
      loding: true,
    });
    setTrigger(Date.now());
  };
  useEffect(() => {
    azxiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loding: false,
          data,
        });
      })
      .catch((error) => {
        setState({ ...state, loding: false, error });
      });
  }, [trigger]);

  if (!opts.url) {
    return;
  }

  return { ...state, refetch };
};
