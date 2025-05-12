import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGrantedPoliciesApi, getUserProfileApi } from '../AccountService/actions';
import type { Store } from '~/store/store';

export async function checkIsLoggedIn() {
  const accessToken = await SecureStore.getItemAsync('accessToken');
  if (!accessToken) {
    return false;
  }
  return true;
}
export async function logoutUser() {
  await SecureStore.deleteItemAsync('accessToken');
  await AsyncStorage.removeItem('refreshToken');
}
export async function loginWithCredentials(username: string, password: string, tenantId?: string) {
  try {
    const response = await fetch('https://api.unirefund.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        __tenant: tenantId || '',
      },
      body: new URLSearchParams({
        username: username,
        password: password,
        client_id: 'Angular',
        grant_type: 'password',
        scope:
          'openid offline_access email profile phone roles address AccountService IdentityService AdministrationService SaasService SettingService TravellerService LocationService ContractService CRMService TagService ExportValidationService RefundService FinanceService',
      }).toString(),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Login failed');
    }

    await SecureStore.setItemAsync('accessToken', data.access_token);
    await AsyncStorage.setItem('refreshToken', data.refresh_token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}
export async function fetchNewAccessTokenByRefreshToken() {
  try {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) {
      await SecureStore.deleteItemAsync('accessToken');
      throw new Error('No refresh token found');
    }
    const response = await fetch('https://api.unirefund.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID || '',
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }).toString(),
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Login failed');
    }

    await SecureStore.setItemAsync('accessToken', data.access_token);
    await AsyncStorage.setItem('refreshToken', data.refresh_token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
}
export async function getUserData(
  setProfile: Store['setProfile'],
  setGrantedPolicies: Store['setGrantedPolicies']
) {
  const userProfile = await getUserProfileApi();
  console.log(userProfile);
  if (!userProfile) {
    console.error('Error fetching user profile:', userProfile);
    return false;
  }
  setProfile(userProfile);
  const grantedPolicies = await getGrantedPoliciesApi();
  setGrantedPolicies(grantedPolicies);
  return true;
}
