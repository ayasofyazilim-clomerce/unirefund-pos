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
          uri: 'http://10.0.2.2:3000/tr/m/account/personal-information',
          headers: {
            Authorization: accessToken,
          },
        }}
        javaScriptEnabled={true}
        startInLoadingState={true}
      />
    </>
  );
}

export default AccountSettings;
