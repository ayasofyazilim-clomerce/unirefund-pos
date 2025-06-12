import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';

const primaryColor = '#dc0201'; // Primary color for the app

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          header: undefined,
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </SafeAreaView>
  );
}
