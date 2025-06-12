import React from 'react';
import { Pressable, View, Text } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

type StepperProps = {
  step: number;
  title: string;
  description: string;
  completed: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

export default function Stepper({
  step,
  title,
  description,
  completed,
  disabled,
  onPress,
}: StepperProps) {
  const stepColor = completed ? 'bg-green-800' : disabled ? 'bg-gray-400' : 'bg-blue-400';
  const textColor = completed ? 'text-green-900' : disabled ? 'text-gray-900' : 'text-blue-900';
  const borderColor = completed
    ? 'border-green-800'
    : disabled
      ? 'border-gray-400'
      : 'border-blue-400';
  const bgColor = completed ? 'bg-green-50' : disabled ? 'bg-gray-50' : 'bg-blue-50';
  const textDescriptionColor = completed
    ? 'text-green-700'
    : disabled
      ? 'text-gray-600'
      : 'text-blue-600';
  const iconColor = completed ? '#166534' : disabled ? '#9ca3af' : '#2563eb';
  const iconSource = completed ? 'check' : disabled ? 'lock' : 'arrow-forward';

  function handlePress() {
    if (disabled || completed) {
      return;
    }
    onPress?.();
  }
  return (
    <Pressable
      className={`relative mt-4 flex-row items-start space-x-3 rounded-xl  border-2 ${borderColor} ${bgColor} p-4 py-6`}
      onPress={handlePress}>
      <View className="absolute -left-4 bottom-0 top-0 m-auto items-center justify-center">
        <View className={`h-8 w-8 items-center justify-center rounded-full  ${stepColor}`}>
          <Text className="text-base font-semibold text-white">{step}</Text>
        </View>
      </View>
      <View className="ml-4 flex-1">
        <Text className={`text-lg font-semibold ${textColor}`}>{title}</Text>
        <Text className={`mt-1 ${textDescriptionColor}`}>{description}</Text>
      </View>
      <View className="ml-auto">
        <Icon source={iconSource} size={20} color={iconColor} />
      </View>
    </Pressable>
  );
}
