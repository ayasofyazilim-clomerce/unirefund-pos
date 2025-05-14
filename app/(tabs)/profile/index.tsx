import { Stack } from 'expo-router';

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { ListItem, ListView } from '~/components/ListView';
import QRModal from './qr-modal';

export default function Profile() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Ev',
        }}
      />
      <View style={styles.container}>
        <ListView title="Hesap ayarları">
          <ListItem title="Hesap bilgileri" icon="account-circle-outline" />
          <ListItem title="Şifre değiştir" icon="lock-outline" />
          <ListItem title="Bildirim tercihleri" icon="bell-badge-outline" />
        </ListView>
        <ListView title="Diğer">
          <ListItem title="Destek" icon="help-circle-outline" />
          <ListItem title="Çıkış Yap" icon="exit-to-app" />
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
