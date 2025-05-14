import { Stack } from 'expo-router';
import { PaperProvider, useTheme } from 'react-native-paper';
import '../global.css';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  const theme = useTheme();
  return (
    <PaperProvider theme={{ roundness: 2, colors: { ...theme.colors, primary: '#dc0201' } }}>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          header: undefined,
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </PaperProvider>
  );
}
