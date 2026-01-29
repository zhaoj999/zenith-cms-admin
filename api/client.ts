// 在 Vercel 部署时使用相对路径,本地开发使用 localhost
const BASE_URL = import.meta.env.VITE_API_URL || (
  import.meta.env.PROD ? '/api' : 'http://localhost:8000/api'
);

interface RequestOptions extends RequestInit {
  // Add any custom options here
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const url = `${BASE_URL}${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorBody}`);
    }

    // Handle empty responses (e.g. 204 No Content)
    if (response.status === 204) {
      return {} as T;
    }

    return await response.json();
  } catch (error) {
    console.error('Request failed:', error);
    throw error;
  }
}
