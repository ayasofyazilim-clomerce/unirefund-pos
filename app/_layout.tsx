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
    <PaperProvider theme={{ roundness: 2 }}>
      <Stack screenOptions={{ header: Header }}>
        <Stack.Screen name="splash" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
      </Stack>
    </PaperProvider>
  );
}
