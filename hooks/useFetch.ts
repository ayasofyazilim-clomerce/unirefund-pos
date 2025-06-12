import { ApiError } from '@ayasofyazilim/core-saas/AccountService';

import { useEffect, useState } from 'react';
import { fetchNewAccessTokenByRefreshToken } from '~/actions/core/auth/fetchNewAccessToken';

export function useFetch<T>(request: () => Promise<T>) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  function makeRequest() {
    setIsLoading(true);
    setError(null);
    setData(null);
    request()
      .then((response) => {
        setData(response);
      })
      .catch((err) => {
        if (err instanceof ApiError) {
          if (err.status === 401) {
            // Refresh the token and retry the request
            fetchNewAccessTokenByRefreshToken().then(() => {
              makeRequest();
            });
            return;
          }
          setError(err);
        } else if (typeof err === 'string') {
          setError(new Error(err));
        } else {
          setError(new Error('An unknown error occurred'));
        }
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    data,
    makeRequest,
  };
}
