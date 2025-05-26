import { router, Stack } from 'expo-router';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import QRCodeStyled from 'react-native-qrcode-styled';
import { logoutUser } from '~/actions/auth/logoutUser';
import { ListItem, ListView } from '~/components/ui/ListView';
import { useStore } from '~/store/store';
import QRModal from './qr-modal';

export default function Profile() {
  const { profile } = useStore();
  const [modalVisible, setModalVisible] = useState(false);
  const { initials, fullName } = avatarPlaceholder();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      bottomSheetModalRef.current?.close();
    }
  }, []);

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
        <View className="relative mb-6 flex-col items-center justify-between gap-3">
          <Avatar.Text size={128} label={initials} />
          <Text className="text-lg font-bold">{fullName}</Text>
          <Pressable className="absolute right-0 top-0" onPress={() => setModalVisible(true)}>
            <QRCodeStyled
              data={'Simple QR Code'}
              style={{ backgroundColor: 'white' }}
              pieceSize={2}
            />
          </Pressable>
        </View>

        <ListView title="Hesap ayarları">
          <ListItem
            title="Hesap bilgileri"
            icon="account-circle-outline"
            onPress={() => router.navigate('/(tabs)/profile/(account)/edit-profile')}
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

      {modalVisible && <QRModal setModalVisible={setModalVisible} />}
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
  },
});
