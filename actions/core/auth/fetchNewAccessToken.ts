import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchNewAccessTokenByRefreshToken() {
  try {
    console.log('Fetching new access token using refresh token...');
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.log('No refresh token found, removing access token...');
      await AsyncStorage.removeItem('accessToken');
      throw new Error('No refresh token found');
    }
    const response = await fetch('https://api.unirefund.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: 'Angular',
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error('Login failed');
    }

    await AsyncStorage.setItem('refreshToken', data.refresh_token);
    return true;
  } catch (error) {
    console.log('Login error:', error);
    return false;
  }
}
