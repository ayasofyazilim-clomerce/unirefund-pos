import { Stack } from 'expo-router';
import WebView from '~/components/ui/WebView';

function ChangePassword() {
  return (
    <>
      <Stack.Screen options={{ title: 'Şifre Değiştir' }} />
      <WebView url="tr/m/account/change-password" />
    </>
  );
}

export default ChangePassword;
