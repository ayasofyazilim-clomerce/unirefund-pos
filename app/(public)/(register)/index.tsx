import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
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
import { getUserData, loginWithCredentials } from '~/actions/auth/actions';
import { signUp } from '~/actions/auth/register';
import SubmitButton from '~/components/Button.Submit';
import Input from '~/components/Input';
import { useStore } from '~/store/store';

export default function Register() {
  const { tenant, setProfile, setGrantedPolicies } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginDisabled, setLoginDisabled] = useState(false);

  async function loginFunction() {
    setLoginDisabled(true);
    try {
      const registerStatus = await signUp(emailInput, usernameInput, passwordInput);
      if ('type' in registerStatus && registerStatus.type === 'error') {
        setLoginError(registerStatus.message);
        return;
      }
      const loginStatus = await loginWithCredentials(
        usernameInput,
        passwordInput,
        tenant?.tenantId || ''
      );

      if (loginStatus !== true) {
        setLoginError(loginStatus);
      }
      if (loginStatus === true && (await getUserData(setProfile, setGrantedPolicies))) {
        router.replace('/registration-flow');
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  function onInputChange() {
    setLoginDisabled(false);
    setLoginError(null);
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

            <HelperText type="error" visible={loginDisabled} className={'-mx-2 p-0'}>
              {loginError}
            </HelperText>

            <SubmitButton
              className="mt-auto"
              mode="contained"
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              onSubmit={loginFunction}
              disabled={loginDisabled}>
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
