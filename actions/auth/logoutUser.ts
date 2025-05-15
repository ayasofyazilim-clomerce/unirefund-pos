import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAccountServiceClient } from '../lib';

export async function logoutUser() {
  const client = await getAccountServiceClient();
  await client.login.getApiAccountLogout();
  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('accessToken');
  await fetch('http://192.168.1.106:1234/api/m/logout');
}
