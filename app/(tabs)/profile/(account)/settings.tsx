import { Stack } from 'expo-router';

import { WebView } from 'react-native-webview';
import { useStore } from '~/store/store';

function AccountSettings() {
  const { accessToken } = useStore();

  return (
    <>
      <Stack.Screen options={{ title: 'Hesap Ayarları' }} />
      <WebView
        source={{
          uri: 'http://192.168.1.106:1234/tr/m/account/personal-information',
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
