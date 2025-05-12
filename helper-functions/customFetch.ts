import { ApiError } from '@ayasofyazilim/core-saas/AccountService';
import { fetchNewAccessTokenByRefreshToken } from '~/actions/auth/actions';

export async function fetchRequest<T>(request: () => Promise<T>) {
  try {
    const response = await request();
    return response;
  } catch (err) {
    if (err instanceof ApiError) {
      if (err.status === 401) {
        // Refresh the token and retry the request
        if (await fetchNewAccessTokenByRefreshToken()) {
          return await fetchRequest(request);
        }
      }
      return err;
    } else if (typeof err === 'string') {
      return new Error(err);
    } else {
      return new Error('An unknown error occurred');
    }
  }
}
