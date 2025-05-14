import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Icon, IconButton } from 'react-native-paper';

function Header(props: BottomTabHeaderProps) {
  const router = useRouter();
  return (
    <View
      style={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
      }}>
      <Text className="text-xl font-bold">{props.options.title}</Text>
      <IconButton
        icon="bell-outline"
        size={24}
        onPress={() => {
          router.navigate('/(tabs)/profile/notifications');
        }}
      />
    </View>
  );
}

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
          tabBarIcon: ({ color }) => <Icon source="account-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
