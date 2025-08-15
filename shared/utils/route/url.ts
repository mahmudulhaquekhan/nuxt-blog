import { useRuntimeConfig } from "nuxt/app";

export function useUrl(config : {
    apiUrl: string;
}) {

  const url = (path: string) => {
    
    let baseUrl = config.apiUrl;

    if (!baseUrl) {
      throw new Error('API URL is not defined in runtime config');
    }
    
    
    //ensure the base URL should not end with a slash
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }

    //ensure the path should not start with a slash
    if (path.startsWith('/')) {
      path = path.slice(1);
    }

    return `${baseUrl}/${path}`;

  }

  return {
    url,
  };
}
