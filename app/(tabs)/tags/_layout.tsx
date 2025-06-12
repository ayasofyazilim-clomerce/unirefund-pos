import { Stack } from 'expo-router';
import { Header } from '~/components/sections/Header';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        header: Header,
        contentStyle: { backgroundColor: '#fff' },
      }}>
      <Stack.Screen
        name="index"
        options={{
          title: 'Tags',
        }}
      />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
