import { Stack } from 'expo-router';

import { WebView } from 'react-native-webview';
import { ENVIRONMENT } from '~/actions/lib';
import { useStore } from '~/store/store';

function AccountSettings() {
  const { accessToken, env } = useStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Hesap Ayarları' }} />
      <WebView
        source={{
          uri: `${ENVIRONMENT[env]}/tr/m/account/personal-information`,
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }}
        javaScriptEnabled={true}
        startInLoadingState={true}
      />
    </>
  );
}

export default AccountSettings;
