import { router } from 'expo-router';
import { useEffect } from 'react';

// SplashScreen.preventAutoHideAsync();

export default function App() {
  function redirectToRegistrationFlow() {
    setTimeout(async () => {
      router.replace('/(public)/(register)/registration-flow');
    }, 1000);
  }
  function initApp() {
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
