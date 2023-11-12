export async function fetcher<T>(url: string, method = 'GET') {
  const response = await fetch(`https://b89a-94-62-132-199.ngrok-free.app/${url}`, {
    method,
    headers: {
      'ngrok-skip-browser-warning': 'value',
    },
  });
  const data = await response.json();

  return data as T;
}
