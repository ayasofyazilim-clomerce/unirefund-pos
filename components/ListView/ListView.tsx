import { Pressable, Text } from 'react-native';
import { Icon } from 'react-native-paper';

export function ListItem({ title, icon }: { title: string; icon: string }) {
  return (
    <Pressable className="flex-row items-center rounded-lg p-2 active:bg-gray-50">
      <Icon source={icon} color={'#080d19'} size={28} />
      <Text className="ml-3 mr-auto text-lg text-[#080d19]">{title}</Text>
      <Icon source="chevron-right" color={'#080d19'} size={32} />
    </Pressable>
  );
}
export function ListView({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Pressable className="mb-8">
      <Text className="mb-2 font-bold">{title}</Text>
      {children}
    </Pressable>
  );
}
