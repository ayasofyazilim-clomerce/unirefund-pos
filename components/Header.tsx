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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        alignItems: 'center',
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {'headerBackVisible' in props.options && (
          <IconButton
            icon="arrow-left"
            size={24}
            onPress={() => {
              router.back();
            }}
          />
        )}

        <Text className="text-xl font-bold">{props.options.title}</Text>
      </View>
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
