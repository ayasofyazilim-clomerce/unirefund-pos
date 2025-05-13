import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { getAccountServiceClient } from '../lib';

export async function logoutUser() {
  const client = await getAccountServiceClient();
  await client.login.getApiAccountLogout();
  await SecureStore.deleteItemAsync('accessTokedn');
  await AsyncStorage.removeItem('refreshToken');
}
