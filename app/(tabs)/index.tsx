import { router, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { logoutUser } from '~/actions/auth/logoutUser';
import SubmitButton from '~/components/Button.Submit';

function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ev' }} />
      <View style={styles.container}></View>
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
