export async function fetcher<T>(url: string, method = 'GET') {
  const response = await fetch(`http://localhost:4000/${url}`, { method });
  const data = await response.json();

  return data as T;
}
