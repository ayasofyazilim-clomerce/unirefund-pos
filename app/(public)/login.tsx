import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Button, Chip, HelperText, Icon } from 'react-native-paper';
import { getUserData, loginWithCredentials } from '~/actions/auth/actions';
import SubmitButton from '~/components/Button.Submit';
import Input from '~/components/Input';
import { useStore } from '~/store/store';

export default function Login() {
  const { tenant, setTenant, setProfile, setGrantedPolicies } = useStore();

  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [logoClickCount, setLogoClickCount] = useState(0);

  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginDisabled, setLoginDisabled] = useState(false);

  async function loginFunction() {
    setLoginDisabled(true);
    try {
      const loginStatus = await loginWithCredentials(
        usernameInput,
        passwordInput,
        tenant?.tenantId || ''
      );
      if (loginStatus !== true) {
        setLoginError(loginStatus);
      }
      if (loginStatus === true && (await getUserData(setProfile, setGrantedPolicies))) {
        router.replace('/(tabs)');
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
    <>
      <Stack.Screen
        options={{
          title: 'Giriş Yap',
        }}
      />

      <View style={styles.container}>
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
            onChangeText={(text) => setUsernameInput(text)}
            onChange={onInputChange}
          />
        </View>
        <View className="flex flex-row">
          <Input
            mode="outlined"
            label="Şifre"
            value={passwordInput}
            onChangeText={(text) => setPasswordInput(text)}
            onChange={onInputChange}
            secureTextEntry={true}
          />
        </View>
        <HelperText type="error" visible={loginDisabled} className={'-mx-2 p-0'}>
          {loginError}
        </HelperText>
        <SubmitButton
          className="mt-4"
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
          onSubmit={loginFunction}
          disabled={loginDisabled}>
          Kayıt Ol
        </SubmitButton>
        {/* <Button
          icon="handshake"
          mode="text"
          labelStyle={{ color: '#71717a' }}
          onPress={() => setLogoClickCount(0)}>
          Kurumsal Giriş
        </Button> */}
      </View>
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
});
