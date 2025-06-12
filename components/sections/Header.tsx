import AsyncStorage from '@react-native-async-storage/async-storage';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';
import { useStore } from '~/store/store';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
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
          <Icon
            name="arrow-back"
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
  const { merchantList, activeMerchant } = useStore();
  if (!merchantList || !merchantList[0]) {
    return null;
  }
  return (
    <Select
      defaultValue={{
        value: activeMerchant?.id || merchantList[0].id,
        label: activeMerchant?.name || merchantList[0].name,
      }}>
      <SelectTrigger className="w-[200px] rounded-none border-0">
        <SelectValue
          className="native:text-lg overflow-hidden text-ellipsis pr-2 text-sm text-foreground"
          placeholder="Select a merchant"
        />
      </SelectTrigger>
      <SelectContent className=" w-[250px] rounded-none">
        <ScrollView>
          {merchantList?.map((merchant) => (
            <SelectItem key={merchant.id} value={merchant.id} label={merchant.name} />
          ))}
        </ScrollView>
      </SelectContent>
    </Select>
  );
}
