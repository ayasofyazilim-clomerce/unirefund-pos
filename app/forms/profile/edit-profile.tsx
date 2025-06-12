import { router } from 'expo-router';
import { useState } from 'react';

import { getLocales } from 'expo-localization';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  getCountryByCca2,
  ICountry,
  isValidPhoneNumber,
  PhoneInputProps,
} from 'react-native-international-phone-number';
import { HelperText, TextInput } from 'react-native-paper';
import { getUserData } from '~/actions/core/auth/actions';
import { editProfile } from '~/actions/core/auth/register';
import SubmitButton from '~/components/ui/Button.Submit';
import Input, { InputPhone } from '~/components/ui/Input';
import { useRegistrationStore, useStore } from '~/store/store';

export default function EditProfileForm() {
  const locales = getLocales();
  const { profile, setProfile, setGrantedPolicies } = useStore();
  const { scannedDocument } = useRegistrationStore();
  const [nameInput, setNameInput] = useState(
    scannedDocument?.fields?.firstName || profile?.name || ''
  );
  const [surnameInput, setSurnameInput] = useState(
    scannedDocument?.fields?.lastName || profile?.surname || ''
  );
  const [phoneInput, setPhoneInput] = useState('');
  const defaultCountryCode = locales?.[0].regionCode || 'TR';

  const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<ICountry | null>(
    getCountryByCca2(defaultCountryCode) || null
  );

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
      phoneNumber: selectedPhoneCountry.callingCode + phoneInput.replaceAll(' ', ''),
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <View className="flex flex-row">
            <Input
              mode="outlined"
              label="Adınız"
              value={nameInput}
              onChangeText={(text) => setNameInput(text)}
              onChange={onInputChange}
              left={<TextInput.Icon icon="account-outline" />}
            />
          </View>
          <View className="mt-3 flex flex-row">
            <Input
              mode="outlined"
              label="Soyadınız"
              value={surnameInput}
              onChangeText={(text) => setSurnameInput(text)}
              onChange={onInputChange}
              left={<TextInput.Icon icon="email-outline" />}
            />
          </View>

          <View className="mt-3 flex flex-row">
            <InputPhone
              label="Telefon"
              defaultValue={profile?.phoneNumber || undefined}
              value={phoneInput}
              popularCountries={['GB', 'PT', 'TR']}
              defaultCountry={
                (defaultCountryCode as PhoneInputProps['defaultCountry']) || undefined
              }
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
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
