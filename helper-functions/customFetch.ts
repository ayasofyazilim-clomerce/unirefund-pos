import { ApiError } from '@ayasofyazilim/core-saas/AccountService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchNewAccessTokenByRefreshToken } from '~/actions/auth/fetchNewAccessToken';

export async function fetchRequest<T>(request: () => Promise<T>) {
  try {
    const response = await request();
    return response;
  } catch (err) {
    console.log(err);
    if (err instanceof ApiError) {
      if (err.status === 401) {
        // Refresh the token and retry the request
        if (await fetchNewAccessTokenByRefreshToken()) {
          return await fetchRequest(request);
        } else {
          console.error('Failed to refresh token');
          await AsyncStorage.removeItem('refreshToken');
          await AsyncStorage.removeItem('accessToken');
          return new Error('Failed to refresh token');
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
