export const fetchWrapper = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) => {
  const data = await fetch(
    process.env.NODE_ENV === 'development'
      ? `http://localhost:3000${input}`
      : `https://stay-hub.vercel.app${input}`,
    {
      ...init,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result = await data.json();

  return result as T;
};
