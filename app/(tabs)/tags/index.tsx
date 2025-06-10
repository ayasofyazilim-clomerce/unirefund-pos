import { Stack } from 'expo-router';

import { StyleSheet, View, Text } from 'react-native';

export default function Tags() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Tags',
        }}
      />
      <View style={styles.container}>
        <Text>Tags</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
  },
});
