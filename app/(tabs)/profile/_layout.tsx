import { Appbar, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

export default function RootLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        header: undefined,
        headerShown: false,
        contentStyle: { backgroundColor: '#fff' },
      }}></Stack>
  );
}
