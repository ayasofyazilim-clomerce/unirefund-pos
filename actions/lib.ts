import { AccountServiceClient } from '@ayasofyazilim/core-saas/AccountService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
};

export const ENVIRONMENT = {
  dev: 'http://192.168.1.106:1234',
  live: 'https://uat.unirefund.com',
};

export async function getAccountServiceClient(customHeaders?: Record<string, string>) {
  const accessToken = (await AsyncStorage.getItem('accessToken')) || undefined;

  return new AccountServiceClient({
    TOKEN: accessToken,
    BASE: 'https://api.unirefund.com',
    HEADERS: { ...HEADERS, ...customHeaders },
  });
}
