import type { Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto } from '@ayasofyazilim/core-saas/AccountService';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Chip, HelperText, Modal, Portal, TextInput } from 'react-native-paper';
import { getTenantByNameApi } from '~/actions/AccountService/actions';
import { getUserData, loginWithCredentials } from '~/actions/auth/actions';
import SubmitButton from '~/components/Button/SubmitButton';
import { useDebounce } from '~/hooks/useDebounce';
import { useStore } from '~/store/store';

function TenantSelectionModal({
  tenantNameInput,
  setTenantName,

  hideModal,
  setActiveTenant,
}: {
  tenantNameInput: string;
  setTenantName: React.Dispatch<React.SetStateAction<string>>;
  setActiveTenant: React.Dispatch<
    React.SetStateAction<Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null>
  >;
  hideModal: () => void;
}) {
  const [error, setError] = useState(false);
  const tenantName = useDebounce(tenantNameInput || '', 500);
  const getTenantName = async () => {
    const tenant = await getTenantByNameApi(tenantName);
    if (tenant?.name && tenant?.tenantId) {
      setActiveTenant(tenant);
      setTenantName(tenant.name);
      setError(false);
      hideModal();
      return;
    }
    setActiveTenant(null);
    setError(true);
  };
  return (
    <View className=" bg-white p-10">
      <TextInput
        mode="outlined"
        label="Tenant Adı"
        value={tenantNameInput}
        error={error}
        autoFocus={true}
        onChangeText={(text) => setTenantName(text)}
      />
      <HelperText type="error" visible={error}>
        Bu tenant adı bulunamadı.
      </HelperText>
      <SubmitButton
        className="mt-4"
        mode="contained"
        disabled={!tenantName}
        onSubmit={getTenantName}
        icon={'chevron-right'}>
        Devam Et
      </SubmitButton>
    </View>
  );
}

export default function Login() {
  const { setProfile, setGrantedPolicies } = useStore();
  const [activeTenant, setActiveTenant] =
    useState<Volo_Abp_AspNetCore_Mvc_MultiTenancy_FindTenantResultDto | null>(null);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => {
    if (!activeTenant) {
      setTenantNameInput('');
    }
    setVisible(false);
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tenantNameInput, setTenantNameInput] = useState('');

  const [loginDisabled, setLoginDisabled] = useState(false);

  async function loginFunction() {
    setLoginDisabled(true);
    try {
      if (
        (await loginWithCredentials(username, password, activeTenant?.tenantId || '')) &&
        (await getUserData(setProfile, setGrantedPolicies))
      ) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Giriş Yap',
          headerRight: () => <Appbar.Action icon="cog" onPress={showModal} />,
        }}
      />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <TenantSelectionModal
            setTenantName={setTenantNameInput}
            setActiveTenant={setActiveTenant}
            tenantNameInput={tenantNameInput}
            hideModal={hideModal}
          />
        </Modal>
      </Portal>
      <View style={styles.container}>
        {!!activeTenant?.name && (
          <Chip icon="information" onClose={() => setActiveTenant(null)} className="mb-2">
            {activeTenant.name} tenant'ına giriş yapmaktasınız.
          </Chip>
        )}
        <TextInput
          mode="outlined"
          label="Email"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          mode="outlined"
          label="Şifre"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <SubmitButton
          className="mt-4 rounded-none"
          mode="contained"
          onSubmit={loginFunction}
          icon={'login'}
          disabled={loginDisabled}>
          Giriş Yap
        </SubmitButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
