import { Stack } from 'expo-router';

import { WebView } from 'react-native-webview';
import { ENVIRONMENT } from '~/actions/lib';
import { useStore } from '~/store/store';

function ChangePassword() {
  const { accessToken, env } = useStore();
  return (
    <>
      <Stack.Screen options={{ title: 'Şifre Değiştir' }} />
      <WebView
        source={{
          uri: `${ENVIRONMENT[env]}/tr/m/account/change-password`,
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
