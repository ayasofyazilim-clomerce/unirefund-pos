import { Stack } from 'expo-router';
import { PaperProvider, useTheme } from 'react-native-paper';
import '../global.css';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
  const theme = useTheme();
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <StatusBar style="dark" />
      <PaperProvider theme={{ roundness: 2, colors: { ...theme.colors, primary: '#dc0201' } }}>
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
    </SafeAreaView>
  );
}
