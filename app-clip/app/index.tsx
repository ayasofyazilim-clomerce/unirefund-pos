import { router, SplashScreen } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  function redirectToRegistrationFlow() {
    console.log('Redirecting to registration flow');
    router.replace('/(public)/(register)/registration-flow');
    setTimeout(async () => {
      console.log('Hiding splash screen');
      await SplashScreen.hideAsync();
    }, 2000);
  }
  async function initApp() {
    redirectToRegistrationFlow();
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
