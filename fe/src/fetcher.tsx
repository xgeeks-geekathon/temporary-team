import { useEffect, useState } from 'react';

const fetcher = async () => {
  const response = await fetch('https://random-data-api.com/api/v2/users?size=2');
  const data = await response.json();

  return data;
};

const initialState = {
  isLoading: true,
  data: undefined,
  error: false,
};

export const useFetcher = (disabled?: boolean) => {
  const [state, setState] = useState<{ isLoading: boolean; data: any; error: boolean }>(initialState);

  useEffect(() => {
    if (disabled) return;

    fetcher()
      .then((data) => {
        setState({ isLoading: false, data, error: false });
      })
      .catch(() => {
        setState({ isLoading: false, data: undefined, error: true });
      });
  }, [disabled]);

  const reset = () => {
    setState(initialState);
  };

  return { ...state, reset };
};
