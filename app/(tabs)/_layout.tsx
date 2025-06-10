import AntDesign from '@expo/vector-icons/AntDesign';
import { NovuProvider } from '@novu/react-native';
import { Tabs, useRouter } from 'expo-router';
import { Icon } from 'react-native-paper';
import { Header } from '~/components/sections/Header';

export default function TabLayout() {
  const router = useRouter();

  return (
    <NovuProvider
      subscriber="008f528-e16d-73e3-511d-3a17dd3174d2"
      applicationIdentifier="4o6o47EJm5yN"
      apiUrl="https://novuapi.clomerce.com"
      // socketUrl="https://ws.novu.co"
    >
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'black',
          sceneStyle: { backgroundColor: '#fff' },
          header: Header,
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Ev',
            tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tags"
          options={{
            href: '/(tabs)/tags',
            title: 'Tags',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon source="tag-multiple-outline" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: '/(tabs)/profile',
            title: 'Profil',
            headerShown: false,
            tabBarIcon: ({ color }) => <Icon source="account-outline" size={28} color={color} />,
          }}
        />
      </Tabs>
    </NovuProvider>
  );
}
