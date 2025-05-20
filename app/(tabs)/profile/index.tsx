import { router, Stack } from 'expo-router';

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { logoutUser } from '~/actions/auth/logoutUser';
import { ListItem, ListView } from '~/components/ListView';
import { useStore } from '~/store/store';
import QRModal from './qr-modal';

export default function Profile() {
  const { profile } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const { initials, fullName } = avatarPlaceholder();
  async function logoutAndRedirect() {
    await logoutUser();
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace('/(public)/login');
  }

  function avatarPlaceholder() {
    let initials = '';
    let fullName = '';

    if (profile?.name && profile?.surname) {
      fullName = `${profile?.name} ${profile?.surname}`;
    }
    if (profile?.userName) {
      fullName = profile?.userName;
    }

    initials = fullName
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toLocaleUpperCase();

    return {
      initials,
      fullName,
    };
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profil',
        }}
      />
      <View style={styles.container}>
        <View className="mb-6 flex-col items-center justify-between gap-3">
          <Avatar.Text size={128} label={initials} />
          <Text className="text-lg font-bold">{fullName}</Text>
        </View>
        <ListView title="Hesap ayarları">
          <ListItem
            title="Hesap bilgileri"
            icon="account-circle-outline"
            onPress={() => router.navigate('/(tabs)/profile/(account)/settings')}
          />
          <ListItem
            title="Şifre değiştir"
            icon="lock-outline"
            onPress={() => router.navigate('/(tabs)/profile/(account)/change-password')}
          />
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
