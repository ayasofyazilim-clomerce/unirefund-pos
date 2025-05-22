import { router, Stack } from 'expo-router';
import { ParseResult } from 'mrz';
import { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ICountry, isValidPhoneNumber } from 'react-native-international-phone-number';
import { HelperText, TextInput } from 'react-native-paper';
import { getUserData } from '~/actions/auth/actions';
import { editProfile } from '~/actions/auth/register';
import SubmitButton from '~/components/Button.Submit';
import Input, { InputPhone } from '~/components/Input';
import { useStore } from '~/store/store';

function ScanResult({ parseResult }: { parseResult: ParseResult }) {
  const { profile, setProfile, setGrantedPolicies } = useStore();

  async function onSubmit() {}
  return (
    <>
      <Stack.Screen
        options={{ title: 'Profilini Tamamla', headerShown: true, headerBackTitle: 'Geri' }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {parseResult.details.map((detail) => {
              return (
                <View className="mt-3 flex flex-row gap-4" key={detail.label}>
                  <Text className="font-bold">{detail.label}:</Text>
                  <Text>{detail.value}</Text>
                </View>
              );
            })}

            <SubmitButton
              className="mt-auto"
              mode="contained"
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              onSubmit={onSubmit}
              // disabled={isSubmitDisabled}
            >
              Profili Kaydet
            </SubmitButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
export default ScanResult;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
