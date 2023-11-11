import { useEffect, useState } from 'react';

const fetcher = async (url: string) => {
  const response = await fetch(`http://localhost:4000/${url}`);
  const data = await response.json();

  return data;
};

const initialState = {
  isLoading: true,
  data: undefined,
  error: false,
};

export const useFetcher = (url: string, disabled?: boolean) => {
  const [state, setState] = useState<{ isLoading: boolean; data: any; error: boolean }>(initialState);

  useEffect(() => {
    if (disabled) return;

    fetcher(url)
      .then((data) => {
        setState({ isLoading: false, data, error: false });
      })
      .catch(() => {
        setState({ isLoading: false, data: undefined, error: true });
      });
  }, [url, disabled]);

  const reset = () => {
    setState(initialState);
  };

  return { ...state, reset };
};
