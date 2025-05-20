import { Stack } from 'expo-router';

import { StyleSheet, View } from 'react-native';
import WebView from '~/components/WebView';
function EditProfile() {
  return (
    <>
      <Stack.Screen
        options={{ title: 'Profilini Güncelle', headerShown: true, headerBackTitle: 'Geri' }}
      />
      <View style={styles.container}>
        <WebView url="tr/m/account/personal-information" />
      </View>
    </>
  );
}
export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
