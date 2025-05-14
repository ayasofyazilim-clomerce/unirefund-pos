import { Stack } from 'expo-router';
import { Header } from '~/components/Header';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: Header,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(account)/settings" options={{ title: 'Hesap Ayarları' }} />
    </Stack>
  );
}
