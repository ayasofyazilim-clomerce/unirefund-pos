import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

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
            contentStyle={{ alignItems: 'flex-start' }}
            size={24}
            onPress={() => {
              router.back();
            }}
          />
        )}

        <Text className="text-xl font-bold">{props.options.title}</Text>
      </View>
      <MerchantSelect />
    </View>
  );
}

function MerchantSelect() {
  const merchants = [
    {
      label: 'Merchant - 1 ',
      value: 'merchant-1',
    },
    {
      label: 'Merchant - 2 ',
      value: 'merchant-2',
    },
    {
      label: 'Merchant - 3 ',
      value: 'merchant-3',
    },
    {
      label: 'Merchant - 4 ',
      value: 'merchant-4',
    },
    {
      label: 'Merchant - 5 ',
      value: 'merchant-5',
    },
    {
      label: 'Merchant - 6 ',
      value: 'merchant-6',
    },
    {
      label: 'Merchant - 7 ',
      value: 'merchant-7',
    },
    {
      label: 'Merchant - 8 ',
      value: 'merchant-8',
    },
    {
      label: 'Merchant - 9 ',
      value: 'merchant-9',
    },
    {
      label: 'Merchant - 10 ',
      value: 'merchant-10',
    },
  ];

  return (
    <Select defaultValue={{ value: 'merchant-1', label: 'Merchant - 1 ' }}>
      <SelectTrigger className="w-[200px] rounded-none border-0">
        <SelectValue
          className="text-foreground native:text-lg overflow-hidden text-ellipsis pr-2 text-sm"
          placeholder="Select a merchant"
        />
      </SelectTrigger>
      <SelectContent className=" w-[250px] rounded-none">
        <ScrollView>
          {merchants.map((merchant) => (
            <SelectItem key={merchant.value} value={merchant.value} label={merchant.label} />
          ))}
        </ScrollView>
      </SelectContent>
    </Select>
  );
}
