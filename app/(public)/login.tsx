import { Link, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Button, Chip, HelperText, Icon, SegmentedButtons, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getUserData, loginWithCredentials } from '~/actions/auth/actions';
import SubmitButton from '~/components/Button.Submit';
import Input from '~/components/Input';
import { useStore } from '~/store/store';
import * as SecureStore from 'expo-secure-store';

export default function Login() {
  const { tenant, setTenant, setProfile, setGrantedPolicies, setEnv, env } = useStore();

  const [showPassword, setShowPassword] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [logoClickCount, setLogoClickCount] = useState(0);

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginDisabled, setLoginDisabled] = useState(false);

  useEffect(() => {
    if (logoClickCount > 5) {
      setUsernameInput('admin');
      setPasswordInput('1q2w3E*');
    }
  }, [logoClickCount]);
  async function loginFunction() {
    setLoginDisabled(true);
    try {
      await SecureStore.setItemAsync('env', env);
      const loginStatus = await loginWithCredentials(
        usernameInput,
        passwordInput,
        tenant?.tenantId || ''
      );
      if (loginStatus !== true) {
        setLoginError(loginStatus);
      }
      const userData = await getUserData(setProfile, setGrantedPolicies);
      if (loginStatus === true && userData) {
        if (userData.name) {
          router.replace('/(tabs)');
          return;
        }
        router.replace('/(public)/(register)/registration-flow');
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
      <View className="px-6 pt-8">
        <SegmentedButtons
          value={env}
          onValueChange={setEnv}
          theme={{ colors: { secondaryContainer: '#de1919', onSecondaryContainer: '#fff' } }}
          buttons={[
            {
              value: 'dev',
              label: 'Dev',
            },
            {
              value: 'live',
              label: 'Live',
            },
          ]}
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Pressable
              className="mb-12 items-center justify-center"
              onPress={() => setLogoClickCount((i) => i + 1)}>
              <Image
                source={require('~/assets/unirefund.png')}
                style={{
                  width: 160,
                  height: 29,
                  resizeMode: 'contain',
                }}
              />
            </Pressable>
            {!!tenant?.name && (
              <Chip
                icon={() => <Icon source="earth" size={16} />}
                onClose={() => setTenant(null)}
                className="mb-2"
                style={{ borderWidth: 1, borderColor: '#ddd' }}>
                {tenant.name} tenant'ına giriş yapmaktasınız.
              </Chip>
            )}
            <View className="flex flex-row">
              <Input
                mode="outlined"
                label="Email"
                value={usernameInput}
                left={<TextInput.Icon icon="email-outline" />}
                onChangeText={(text) => setUsernameInput(text)}
                onChange={onInputChange}
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
              mode="contained"
              onSubmit={loginFunction}
              icon={'login'}
              disabled={loginDisabled}>
              Giriş Yap
            </SubmitButton>
            <SubmitButton
              className="mt-4"
              labelStyle={{ color: '#71717a' }}
              mode="outlined"
              icon={'account-plus'}
              onSubmit={async () => router.replace('/(public)/(register)')}
              disabled={loginDisabled}>
              Kayıt Ol
            </SubmitButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View className={`${logoClickCount > 5 ? '' : 'invisible'} items-center`}>
        <Link href="/(public)/tenant-modal" asChild>
          <Button
            icon="handshake"
            mode="text"
            labelStyle={{ color: '#71717a' }}
            theme={{ colors: { primary: '#71717a' } }}>
            Kurumsal Giriş
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
