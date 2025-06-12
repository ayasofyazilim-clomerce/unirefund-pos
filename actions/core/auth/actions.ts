import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { decodeJWT } from '~/lib/utils';
import type { Store } from '~/store/types';
import { getGrantedPoliciesApi, getUserProfileApi } from '../AccountService/actions';
import { ENVIRONMENT } from '~/actions/lib';
import { getMerchants } from '~/actions/unirefund/CRMService/actions';
import { API_URL } from '~/lib/constants';

export async function checkIsLoggedIn() {
  const accessToken = (await AsyncStorage.getItem('accessToken')) || undefined;
  if (!accessToken) {
    return false;
  }
  return true;
}

export async function loginWithCredentials(username: string, password: string, tenantId?: string) {
  try {
    const env = (await SecureStore.getItemAsync('env')) as Store['env'];
    const response = await fetch(`${API_URL}/connect/token`, {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...(tenantId ? { __tenant: tenantId } : {}),
      },
      body: new URLSearchParams({
        username: username,
        password: password,
        client_id: 'Angular',
        grant_type: 'password',
        scope:
          'openid offline_access email profile phone roles address AdministrationService AccountService IdentityService SaasService SettingService TravellerService LocationService ContractService CRMService TagService RefundService ExportValidationService FinanceService ReportService FileService',
      }).toString(),
    });
    const data = await response.json();
    if (!response.ok) {
      if (data.error_description) {
        return data.error_description as string;
      }
      return 'Unknown error';
    }
    const decoded = decodeJWT(data.access_token);
    await AsyncStorage.setItem('activeMerchant', decoded.active_merchant || '');
    await AsyncStorage.setItem('refreshToken', data.refresh_token);
    await AsyncStorage.setItem('accessToken', data.access_token);
    await fetch(`${ENVIRONMENT[env]}/api/m/?access_token=${data.access_token}`);
    return true;
  } catch (error) {
    console.log('Login error:', error);
    return 'Unknown error';
  }
}

export async function getUserData(
  setProfile: Store['setProfile'],
  setGrantedPolicies: Store['setGrantedPolicies'],
  setMerchantList: Store['setMerchantList'],
  setActiveMerchant: Store['setActiveMerchant']
) {
  const userProfile = await getUserProfileApi();
  if (!userProfile) {
    console.log('Error fetching user profile:', userProfile);
    return false;
  }
  setProfile(userProfile);
  const grantedPolicies = await getGrantedPoliciesApi();
  setGrantedPolicies(grantedPolicies);
  const memberList = await getMerchants();
  setMerchantList(memberList?.items || null);
  const activeMerchant = await AsyncStorage.getItem('activeMerchant');
  if (activeMerchant && activeMerchant.length > 0) {
    setActiveMerchant(memberList?.items?.find((m) => m.id === activeMerchant) || null);
  } else {
    setActiveMerchant(memberList?.items?.[0] || null);
  }
  return userProfile;
}

export type JWTUser = {
  aud: string[] | null;
  client_id: string | null;
  email: string | null;
  email_verified: string | null;
  exp: number;
  family_name: string | null;
  given_name: string | null;
  iat: number;
  iss: string | null;
  jti: string | null;
  oi_au_id: string | null;
  oi_prst: string | null;
  oi_tkn_id: string | null;
  phone_number: string | null;
  phone_number_verified: string | null;
  preferred_username: string | null;
  role: string | null;
  scope: string | null;
  session_id: string | null;
  sub: string | null;
  unique_name: string | null;
  active_merchant: string | null;
};
