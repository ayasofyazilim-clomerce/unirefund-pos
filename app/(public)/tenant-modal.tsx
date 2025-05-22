import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { HelperText, IconButton } from 'react-native-paper';
import { getTenantByNameApi } from '~/actions/AccountService/actions';
import SubmitButton from '~/components/ui/Button.Submit';
import Input from '~/components/ui/Input';
import { useDebounce } from '~/hooks/useDebounce';
import { useStore } from '~/store/store';

export default function Modal() {
  const router = useRouter();
  const { tenant, setTenant } = useStore();
  const [tenantNameInput, setTenantNameInput] = useState(tenant?.name || '');

  const [error, setError] = useState(false);
  const tenantName = useDebounce(tenantNameInput || '', 500);
  const getTenantName = async () => {
    const tenant = await getTenantByNameApi(tenantName);
    if (tenant?.name && tenant?.tenantId) {
      setTenant(tenant);
      setError(false);
      router.back();
      return;
    }
    setTenant(null);
    setError(true);
  };
  return (
    <View className="flex-1">
      <View className="items-end">
        <IconButton icon="close" size={24} onPress={() => router.back()} />
      </View>
      <View style={styles.container}>
        <View>
          <View className="flex flex-row">
            <Input
              mode="outlined"
              label="Tenant Adı"
              value={tenantNameInput}
              error={error}
              autoFocus={true}
              onChangeText={(text) => setTenantNameInput(text)}
            />
          </View>
          <HelperText type="error" visible={error}>
            Bu tenant adı bulunamadı.
          </HelperText>
        </View>
        <SubmitButton
          className="mt-4"
          mode="contained"
          disabled={!tenantName}
          onSubmit={getTenantName}
          icon={'chevron-right'}>
          Devam Et
        </SubmitButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
