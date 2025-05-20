import {
  Volo_Abp_Account_ProfileDto,
  Volo_Abp_Account_UpdateProfileDto,
} from '@ayasofyazilim/core-saas/AccountService';
import { getAccountServiceClient } from '../lib';

export async function signUp(emailAddress: string, userName: string, password: string) {
  const client = await getAccountServiceClient();

  try {
    const response = await client.account.postApiAccountRegister({
      requestBody: {
        emailAddress,
        password,
        userName,
        appName: 'MVC',
      },
    });
    return response;
  } catch (error) {
    const err = error as { body: { error: { message: string } } };
    console.error('Error during sign up:', error);
    return {
      type: 'error' as const,
      message: err?.body?.error.message,
    };
  }
}

export async function editProfile(
  profile: Volo_Abp_Account_ProfileDto,
  name: string,
  surname: string,
  phoneNumber: string
) {
  const client = await getAccountServiceClient();
  try {
    const response = await client.profile.putApiAccountMyProfile({
      requestBody: {
        ...profile,
        name,
        surname,
        phoneNumber,
      } as Volo_Abp_Account_UpdateProfileDto,
    });
    return response;
  } catch (error) {
    const err = error as { body: { error: { message: string } } };
    console.error('Error during updating profile:', error);
    return {
      type: 'error' as const,
      message: err?.body?.error.message,
    };
  }
}
