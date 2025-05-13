import { router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { logoutUser } from '~/actions/auth/logoutUser';
import SubmitButton from '~/components/Button/SubmitButton';

function Home() {
  async function logoutAndRedirect() {
    await logoutUser();
    router.replace('/auth/login');
  }

  return (
    <>
      <Stack.Screen options={{ title: 'Ev' }} />
      <View style={styles.container}>
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

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
