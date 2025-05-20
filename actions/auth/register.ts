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
