import { router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { logoutUser } from '~/actions/auth/actions';
import SubmitButton from '~/components/Button/SubmitButton';

export default function Home() {
  async function logoutAndRedirect() {
    await logoutUser();
    // Redirect to login screen
    router.replace('/login');
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Ev' }} />
      <View style={styles.container}>
        l
        <SubmitButton
          className="mt-4"
          mode="contained"
          onSubmit={logoutAndRedirect}
          icon={'chevron-right'}>
          Çıkış Yap
        </SubmitButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
