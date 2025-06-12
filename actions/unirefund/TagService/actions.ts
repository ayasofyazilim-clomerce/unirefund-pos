import { GetApiTagServiceTagData } from '@ayasofyazilim/saas/TagService';
import { fetchRequest } from '~/helper-functions/customFetch';
import { getTagServiceClient } from '~/actions/lib';

export async function getTags(data?: GetApiTagServiceTagData) {
  async function getData() {
    const client = await getTagServiceClient();
    return await client.tag.getApiTagServiceTag(data);
  }
  const response = await fetchRequest(getData, 'getTags');
  return response;
}

export async function getTagDetailsById(id: string) {
  async function getData() {
    const client = await getTagServiceClient();
    return await client.tag.getApiTagServiceTagByIdDetail({ id });
  }
  const response = await fetchRequest(getData, 'getTagDetailsById ');
  return response;
}
