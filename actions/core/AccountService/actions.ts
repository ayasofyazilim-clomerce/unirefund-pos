import { fetchRequest } from '~/helper-functions/customFetch';
import { getAccountServiceClient } from '~/actions/lib';
import type { GrantedPolicies } from './types';

export async function getUserProfileApi() {
  async function getData() {
    const client = await getAccountServiceClient();
    return await client.profile.getApiAccountMyProfile();
  }
  return await fetchRequest(getData,"getUserProfileApi");
}
export async function getGrantedPoliciesApi() {
  async function getData() {
    const client = await getAccountServiceClient();
    const response = await client.abpApplicationConfiguration.getApiAbpApplicationConfiguration({
      includeLocalizationResources: false,
    });
    return response.auth?.grantedPolicies as GrantedPolicies;
  }
  return await fetchRequest(getData,"getGrantedPoliciesApi");
}
export async function getTenantByNameApi(name: string) {
  async function getData() {
    const client = await getAccountServiceClient();
    return await client.abpTenant.getApiAbpMultiTenancyTenantsByNameByName({ name });
  }
  return await fetchRequest(getData,"getTenantByNameApi");
}
