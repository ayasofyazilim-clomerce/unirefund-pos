import { AccountServiceClient } from '@ayasofyazilim/core-saas/AccountService';

import * as SecureStore from 'expo-secure-store';

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
};
export async function getAccountServiceClient(customHeaders?: Record<string, string>) {
  const accessToken = (await SecureStore.getItemAsync('accessToken')) || undefined;

  return new AccountServiceClient({
    TOKEN: accessToken,
    BASE: 'https://api.unirefund.com',
    HEADERS: { ...HEADERS, ...customHeaders },
  });
}
