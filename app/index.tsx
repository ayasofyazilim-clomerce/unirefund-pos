import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { getGrantedPoliciesApi, getUserProfileApi } from '~/actions/AccountService/actions';
import { checkIsLoggedIn } from '~/actions/auth/actions';
import { useStore } from '~/store/store';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENVIRONMENT } from '~/actions/lib';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { setProfile, setGrantedPolicies, setAccessToken, setEnv } = useStore();

  function redirectToLogin() {
    router.replace('/(public)/login');
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

  function redirectToHome() {
    router.replace('/(tabs)');
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }

  async function initApp() {
    const isLoggedIn = await checkIsLoggedIn();
    if (isLoggedIn) {
      console.log('User is logged in');
      const userProfile = await getUserProfileApi();
      if (!userProfile) {
        console.log('Error fetching user profile:', userProfile);
        redirectToLogin();
        return;
      }
      const accessToken = await AsyncStorage.getItem('accessToken');
      const env = ((await SecureStore.getItemAsync('env')) || 'live') as 'dev' | 'live';
      await fetch(`${ENVIRONMENT[env]}/api/m/?access_token=${accessToken}`);

      setEnv(env);
      setAccessToken(accessToken);

      setProfile(userProfile);
      const grantedPolicies = await getGrantedPoliciesApi();
      setGrantedPolicies(grantedPolicies);

      redirectToHome();
    } else {
      // Navigate to the login screen
      redirectToLogin();
    }
  }
  useEffect(() => {
    console.log('App initialized');

    // Check is user logged in or not
    // If user is logged in, navigate to the main screen
    // If user is not logged in, navigate to the login screen
    initApp();
  }, []);
  return null;
}
