import Toast from "react-native-toast-message";

interface FetchOptions extends RequestInit {
  body?: any;
}

export const fetchUtil = async (
  url: string,
  options: FetchOptions = {},
  throwErrOnUnauthorized: boolean = true,
) => {
  const { body, ...restOptions } = options;

  const response = await fetch(url, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...restOptions.headers,
    },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  }).catch((error) => {
    Toast.show({text1: "Fetch Error", type: "error"});
    console.error("Fetch error:", error);
    throw error;
  });

  if (!response.ok && response.status !== 401) {
    Toast.show({text1: `Server Error ${response.status}: ${(await response.json()).message}`, type: "error"});
    throw new Error(response.statusText);
  }

  if (response.status === 401 && throwErrOnUnauthorized) {
    const errorText = response.text();
    console.error("Unauthorized:", errorText);
    Toast.show({text1: "Unauthorized", type: "error"});
    throw new Error("Unauthorized resource");
  }

  return response;
};
