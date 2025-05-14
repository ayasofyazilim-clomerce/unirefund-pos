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
          uri: 'http://10.0.2.2:3000/tr/m/account/change-password',
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
