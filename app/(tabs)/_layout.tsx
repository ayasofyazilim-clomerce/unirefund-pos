import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs, useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-paper';
import { Header } from '~/components/Header';

export default function TabLayout() {
  const router = useRouter();

  return (
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
        name="two"
        options={{
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarButton: () => (
            <Pressable
              onPress={() => router.push('/(tabs)/two')}
              style={{
                position: 'absolute',
                bottom: 10,
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 3,
                borderColor: '#fff',
                backgroundColor: '#de1919',
                justifyContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 5,
                elevation: 8, // Android için
              }}>
              <Icon source="store-marker" size={28} color={'#fff'} />
            </Pressable>
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
  );
}
