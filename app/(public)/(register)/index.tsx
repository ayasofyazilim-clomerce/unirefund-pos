import { router } from 'expo-router';
import { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData, loginWithCredentials } from '~/actions/core/auth/actions';
import { signUp } from '~/actions/core/auth/register';
import SubmitButton from '~/components/ui/Button.Submit';
import Input from '~/components/ui/Input';
import { useStore } from '~/store/store';

export default function Register() {
  const { tenant, setProfile, setGrantedPolicies } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const isSubmitDisabled = !usernameInput || !passwordInput || !emailInput || submitDisabled;

  async function signUpFunction() {
    setSubmitDisabled(true);
    try {
      const registerStatus = await signUp(emailInput, usernameInput, passwordInput);
      if ('type' in registerStatus && registerStatus.type === 'error') {
        setSubmitError(registerStatus.message);
        return;
      }
      const loginStatus = await loginWithCredentials(
        usernameInput,
        passwordInput,
        tenant?.tenantId || ''
      );

      if (loginStatus !== true) {
        setSubmitError(loginStatus);
      }
      if (loginStatus === true && (await getUserData(setProfile, setGrantedPolicies))) {
        router.replace('/(tabs)');
        return;
      }
    } catch (error) {
      console.log('Login error:', error);
    }
  }

  function onInputChange() {
    setSubmitDisabled(false);
    setSubmitError(null);
  }

  return (
    <SafeAreaView className="flex-1" edges={['bottom']}>
      <View className="flex-row justify-start px-6">
        <Button
          icon="arrow-left"
          onPress={() => router.replace('/(public)/login')}
          mode="text"
          textColor="#333"
          style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text className="text-xl font-bold">Geri</Text>
        </Button>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View className="flex flex-row">
              <Input
                mode="outlined"
                label="Kullanıcı Adı"
                value={usernameInput}
                onChangeText={(text) => setUsernameInput(text)}
                onChange={onInputChange}
                left={<TextInput.Icon icon="account-outline" />}
              />
            </View>
            <View className="mt-3 flex flex-row">
              <Input
                mode="outlined"
                label="Email"
                value={emailInput}
                autoComplete="email"
                inputMode="email"
                keyboardType="email-address"
                onChangeText={(text) => setEmailInput(text)}
                onChange={onInputChange}
                left={<TextInput.Icon icon="email-outline" />}
              />
            </View>
            <View className="mt-3 flex flex-row">
              <Input
                mode="outlined"
                label="Şifre"
                value={passwordInput}
                onChangeText={(text) => setPasswordInput(text)}
                onChange={onInputChange}
                secureTextEntry={!showPassword}
                left={<TextInput.Icon icon="lock-outline" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
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
              onSubmit={signUpFunction}
              disabled={isSubmitDisabled}>
              Hesap Oluştur
            </SubmitButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
  },
});
