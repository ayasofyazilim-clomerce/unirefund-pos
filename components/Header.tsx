import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';

export function Header(props: BottomTabHeaderProps | NativeStackHeaderProps) {
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
