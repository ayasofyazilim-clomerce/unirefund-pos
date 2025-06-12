import { GetApiCrmServiceMerchantsData } from '@ayasofyazilim/saas/CRMService';
import { getCRMServiceClient } from '~/actions/lib';
import { fetchRequest } from '~/helper-functions/customFetch';

export async function getMerchants(data?: GetApiCrmServiceMerchantsData) {
  async function getData() {
    const client = await getCRMServiceClient();
    return await client.merchant.getApiCrmServiceMerchants(data);
  }
  const response = await fetchRequest(getData);
  if (response instanceof Error) {
    console.log('Error fetching tenants:', response);
    return undefined;
  }
  return response;
}

export async function getMerchantsByIdApi(id: string) {
  async function getData() {
    const client = await getCRMServiceClient();
    return await client.merchant.getApiCrmServiceMerchantsById({ id });
  }
  const response = await fetchRequest(getData);
  if (response instanceof Error) {
    console.log('Error fetching tenants:', response);
    return undefined;
  }
  return response;
}
