import { TextInput, TextInputProps } from 'react-native-paper';

function Input(args: TextInputProps) {
  return <TextInput {...args} disabled={args.disabled} />;
}

export default Input;
