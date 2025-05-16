import { Stack } from 'expo-router';

import WebView from '~/components/WebView';
import { useStore } from '~/store/store';

function AccountSettings() {
  return (
    <>
      <Stack.Screen options={{ title: 'Hesap Ayarları' }} />
      <WebView url="tr/m/account/personal-information" />
    </>
  );
}

export default AccountSettings;
