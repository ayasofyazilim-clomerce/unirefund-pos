import { Link, Tabs, useRouter } from 'expo-router';
import { Appbar, Icon } from 'react-native-paper';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useStore } from '~/store/store';
import { Pressable, View } from 'react-native';

// import { HeaderButton } from '../../components/HeaderButton';
// import { TabBarIcon } from '../../components/TabBarIcon';

const Header = (props: BottomTabHeaderProps) => (
  <Appbar.Header>
    {/* <Appbar.BackAction onPress={() => props.navigation.goBack()} /> */}

    <Appbar.Content title={props.options.title} />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
);
export default function TabLayout() {
  const { grantedPolicies } = useStore();
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        header: Header,
        sceneStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ev',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     {/* <HeaderButton /> */}
          //   </Link>
          // ),
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
          href: grantedPolicies?.['CRMService.Merchants'] ? '/(tabs)/profile' : null,
          title: 'Profil',
          tabBarIcon: ({ color }) => <Icon source="account-outline" size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
