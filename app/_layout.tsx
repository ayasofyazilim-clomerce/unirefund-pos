import '../global.css';
import { Appbar, PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from 'react-native-paper';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const Header = (props: NativeStackHeaderProps) => (
  <Appbar.Header>
    {/* <Appbar.BackAction onPress={() => props.navigation.goBack()} /> */}

    <Appbar.Content title={props.options.title} />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
    {props.options.headerRight?.({})}
  </Appbar.Header>
);
export default function RootLayout() {
  const theme = useTheme();
  return (
    <PaperProvider theme={{ roundness: 2, colors: { ...theme.colors, primary: '#dc0201' } }}>
      <Stack
        screenOptions={{
          // header: Header,
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="(tabs)" />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </PaperProvider>
  );
}
