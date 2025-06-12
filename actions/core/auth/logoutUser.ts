import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENVIRONMENT, getAccountServiceClient } from '../../lib';
import * as SecureStore from 'expo-secure-store';

export async function logoutUser() {
  const client = await getAccountServiceClient();
  await client.login.getApiAccountLogout();

  await AsyncStorage.removeItem('refreshToken');
  await AsyncStorage.removeItem('accessToken');

  const env = (await SecureStore.getItemAsync('env')) as 'dev' | 'live';
  await fetch(`${ENVIRONMENT[env]}/api/m/logout`);

  await SecureStore.setItemAsync('env', 'live');
}
