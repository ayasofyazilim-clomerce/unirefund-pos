import { Stack } from 'expo-router';
import { Header } from '~/components/Header';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: Header,
        headerBackVisible: true,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="settings" options={{ title: 'Hesap Ayarları' }} />
    </Stack>
  );
}
