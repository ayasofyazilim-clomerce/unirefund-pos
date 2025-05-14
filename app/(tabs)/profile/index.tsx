import { router, Stack } from 'expo-router';

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { logoutUser } from '~/actions/auth/logoutUser';
import { ListItem, ListView } from '~/components/ListView';
import QRModal from './qr-modal';

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);

  async function logoutAndRedirect() {
    await logoutUser();
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace('/(public)/login');
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profil',
        }}
      />
      <View style={styles.container}>
        <ListView title="Hesap ayarları">
          <ListItem
            title="Hesap bilgileri"
            icon="account-circle-outline"
            onPress={() => router.navigate('/(tabs)/profile/(account)/settings')}
          />
          <ListItem title="Şifre değiştir" icon="lock-outline" />
          <ListItem title="Bildirim tercihleri" icon="bell-badge-outline" />
        </ListView>
        <ListView title="Diğer">
          <ListItem title="Destek" icon="help-circle-outline" />
          <ListItem title="Çıkış Yap" icon="exit-to-app" onPress={logoutAndRedirect} />
        </ListView>
      </View>
      <QRModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
