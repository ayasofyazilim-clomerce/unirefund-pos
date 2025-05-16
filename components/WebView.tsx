import { WebView as RNWebView } from 'react-native-webview';
import { ENVIRONMENT } from '~/actions/lib';
import { useStore } from '~/store/store';

function WebView({
  url,
  useAuth = true,
  useEnv = true,
}: {
  url: string;
  useAuth?: boolean;
  useEnv?: boolean;
}) {
  const { accessToken, env } = useStore();
  return (
    <RNWebView
      source={{
        uri: useEnv ? `${ENVIRONMENT[env]}/${url}` : url,
        ...(useAuth ? { headers: { Authorization: 'Bearer ' + accessToken } } : {}),
      }}
      sharedCookiesEnabled={true}
      javaScriptEnabled={true}
      startInLoadingState={true}
    />
  );
}

export default WebView;
