import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import { getGrantedPoliciesApi, getUserProfileApi } from '~/actions/AccountService/actions';
import { checkIsLoggedIn } from '~/actions/auth/actions';
import { useStore } from '~/store/store';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { setProfile, setGrantedPolicies, setAccessToken } = useStore();

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
        console.error('Error fetching user profile:', userProfile);
        redirectToLogin();
        return;
      }
      const accessToken = await AsyncStorage.getItem('accessToken');
      await fetch(`http://192.168.1.106:1234/api/m/?access_token=${accessToken}`);
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
