import {
  AccountServiceClient,
  Volo_Abp_Account_ProfileDto,
} from '@ayasofyazilim/core-saas/AccountService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
};

export const ENVIRONMENT = {
  dev: 'http://81.213.78.69:1441',
  live: 'https://uat.unirefund.com',
};

export function isProfileCompleted(profile: Volo_Abp_Account_ProfileDto | undefined) {
  return (
    !!profile?.name && !!profile?.surname && !!profile.phoneNumber && !!profile.phoneNumberConfirmed
  );
}

export async function getAccountServiceClient(customHeaders?: Record<string, string>) {
  const accessToken = (await AsyncStorage.getItem('accessToken')) || undefined;

  return new AccountServiceClient({
    TOKEN: accessToken,
    BASE: 'https://api.unirefund.com',
    HEADERS: { ...HEADERS, ...customHeaders },
  });
}
