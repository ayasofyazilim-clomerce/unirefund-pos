import { Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ev' }} />
      <View style={styles.container}>
        <Text>Ana Sayfa</Text>
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
