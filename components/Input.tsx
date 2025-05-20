import { Text, View } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-international-phone-number';
import { TextInput, TextInputProps } from 'react-native-paper';

function Input(args: TextInputProps) {
  return (
    <View className="flex-1">
      <Text className="mb-2 font-bold text-gray-600">{args.label}</Text>
      <TextInput
        {...args}
        disabled={args.disabled}
        style={{ backgroundColor: '#fff' }}
        outlineStyle={{ borderRadius: 8, borderWidth: 2 }}
        label={undefined}
        outlineColor="#ddd"
        activeOutlineColor="#daa"
      />
    </View>
  );
}

export function InputPhone(args: PhoneInputProps & { label: string }) {
  return (
    <View className="flex-1">
      <Text className="mb-2 font-bold text-gray-600">{args.label}</Text>
      <PhoneInput
        {...args}
        language="tr"
        phoneInputStyles={{
          flagContainer: {
            backgroundColor: 'white',
            borderRightWidth: 1,
            borderColor: '#ddd',
          },

          caret: { display: 'none' },
          divider: { display: 'none' },
        }}
      />
    </View>
  );
}

export default Input;
