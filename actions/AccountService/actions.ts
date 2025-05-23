import { fetchRequest } from '~/helper-functions/customFetch';
import { getAccountServiceClient } from '../lib';
import type { GrantedPolicies } from './types';

export async function getUserProfileApi() {
  async function getData() {
    const client = await getAccountServiceClient();
    return await client.profile.getApiAccountMyProfile();
  }
  const response = await fetchRequest(getData);
  if (response instanceof Error) {
    console.log('Error fetching user profile:', response);
    return undefined;
  }
  return response;
}
export async function getGrantedPoliciesApi() {
  async function getData() {
    const client = await getAccountServiceClient();
    const response = await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
    return response.auth?.grantedPolicies as GrantedPolicies;
  }
  const response = await fetchRequest(getData);
  if (response instanceof Error) {
    console.log('Error fetching granted policies:', response);
    return undefined;
  }
  return response;
}
export async function getTenantByNameApi(name: string) {
  async function getData() {
    const client = await getAccountServiceClient();
    return await client.abpTenant.getApiAbpMultiTenancyTenantsByNameByName({ name });
  }
  const response = await fetchRequest(getData);
  if (response instanceof Error) {
    console.log('Error fetching tenants:', response);
    return undefined;
  }
  return response;
}
