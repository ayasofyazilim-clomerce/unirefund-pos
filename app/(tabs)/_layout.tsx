import { Link, Tabs } from 'expo-router';
import { Appbar } from 'react-native-paper';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useStore } from '~/store/store';

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

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        header: Header,
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
          href: grantedPolicies?.['CRMService.Merchants'] ? '/two' : null,
          title: 'Mağazalar',
          tabBarIcon: ({ color }) => <AntDesign name="isv" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
