import { useEffect, useState } from 'react';

const fetcher = async (url: string, method = 'GET') => {
  const response = await fetch(`http://localhost:4000/${url}`, { method });
  const data = await response.json();

  return data;
};

const initialState = {
  isLoading: true,
  data: undefined,
  error: false,
};

export function useFetcher<T>(url: string, extra?: { disabled?: boolean; method?: string }) {
  const [state, setState] = useState<{ isLoading: boolean; data: T | undefined; error: boolean }>(initialState);

  useEffect(() => {
    if (extra?.disabled) return;

    fetcher(url, extra?.method)
      .then((data) => {
        setState({ isLoading: false, data, error: false });
      })
      .catch(() => {
        setState({ isLoading: false, data: undefined, error: true });
      });
  }, [url, extra]);

  const reset = () => {
    setState(initialState);
  };

  return { ...state, reset };
}
