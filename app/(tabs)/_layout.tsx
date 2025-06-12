import Icon from '@expo/vector-icons/Ionicons';
import { NovuProvider } from '@novu/react-native';
import { Tabs } from 'expo-router';
import { Header } from '~/components/sections/Header';

export default function TabLayout() {
  return (
    <NovuProvider
      subscriber="008f528-e16d-73e3-511d-3a17dd3174d2"
      applicationIdentifier="4o6o47EJm5yN"
      apiUrl="https://novuapi.clomerce.com">
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
            tabBarIcon: ({ color }) => <Icon name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="tags"
          options={{
            href: '/(tabs)/tags',
            title: 'Tags',
            headerShown: false,
            tabBarIcon: ({ color }) => <Icon name="pricetags-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: '/(tabs)/profile',
            title: 'Profil',
            headerShown: false,
            tabBarIcon: ({ color }) => <Icon name="person-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
    </NovuProvider>
  );
}
