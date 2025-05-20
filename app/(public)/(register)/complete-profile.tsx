import { router, Stack } from 'expo-router';
import { useState } from 'react';

import {
  Keyboard,
  KeyboardAvoidingView,
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

function EditProfile() {
  const { profile, setProfile, setGrantedPolicies } = useStore();

  const [nameInput, setNameInput] = useState('');
  const [surnameInput, setSurnameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<ICountry | null>(null);

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const isPhoneValid = selectedPhoneCountry && isValidPhoneNumber(phoneInput, selectedPhoneCountry);
  const isSubmitDisabled = !nameInput || !surnameInput || !isPhoneValid || submitDisabled;

  function handlePhoneInputchange(phoneNumber: string) {
    setPhoneInput(phoneNumber);
  }

  function handlePhoneInputCountryChange(country: ICountry | null) {
    setSelectedPhoneCountry(country);
  }
  function onInputChange() {
    setSubmitDisabled(false);
    setSubmitError(null);
  }

  async function onSubmit() {
    setSubmitDisabled(true);
    setSubmitError(null);

    if (!isPhoneValid) {
      setSubmitError('Lütfen geçerli bir telefon numarası girin.');
      return;
    }

    const updatedProfile = {
      ...profile,
      name: nameInput,
      surname: surnameInput,
      phoneNumber: phoneInput,
    };

    const response = await editProfile(
      profile!,
      updatedProfile.name,
      updatedProfile.surname,
      updatedProfile.phoneNumber
    );

    if ('type' in response && response.type === 'error') {
      setSubmitError(response.message);
      setSubmitDisabled(false);
      return;
    }

    await getUserData(setProfile, setGrantedPolicies);
    router.back();
  }
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
            <View className="flex flex-row">
              <Input
                mode="outlined"
                label="Adınız"
                value={surnameInput}
                onChangeText={(text) => setSurnameInput(text)}
                onChange={onInputChange}
                left={<TextInput.Icon icon="account-outline" />}
              />
            </View>
            <View className="mt-3 flex flex-row">
              <Input
                mode="outlined"
                label="Soyadınız"
                value={nameInput}
                onChangeText={(text) => setNameInput(text)}
                onChange={onInputChange}
                left={<TextInput.Icon icon="email-outline" />}
              />
            </View>

            <View className="mt-3 flex flex-row">
              <InputPhone
                label="Telefon"
                value={phoneInput}
                onChangePhoneNumber={handlePhoneInputchange}
                selectedCountry={selectedPhoneCountry}
                onChangeSelectedCountry={handlePhoneInputCountryChange}
                language="tr"
              />
            </View>
            <HelperText type="error" visible={submitDisabled} className={'-mx-2 p-0'}>
              {submitError}
            </HelperText>

            <SubmitButton
              className="mt-auto"
              mode="contained"
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              onSubmit={onSubmit}
              disabled={isSubmitDisabled}>
              Profili Kaydet
            </SubmitButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
export default EditProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
