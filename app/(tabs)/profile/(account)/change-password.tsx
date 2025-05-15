import { Stack } from 'expo-router';

import { WebView } from 'react-native-webview';
import { useStore } from '~/store/store';

function ChangePassword() {
  const { accessToken } = useStore();
  return (
    <>
      <Stack.Screen options={{ title: 'Şifre Değiştir' }} />
      <WebView
        source={{
          uri: 'http://192.168.1.106:1234/tr/m/account/change-password',
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

export default ChangePassword;
