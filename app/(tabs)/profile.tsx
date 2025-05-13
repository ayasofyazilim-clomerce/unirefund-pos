import { Stack } from 'expo-router';

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-paper';
import { ListView } from '~/components/ListView/ListView';

function ListItem({ title, icon }: { title: string; icon: string }) {
  return (
    <Pressable className="flex-row items-center rounded-lg p-2 active:bg-gray-50">
      <Icon source={icon} color={'#080d19'} size={28} />
      <Text className="ml-3 mr-auto text-lg text-[#080d19]">{title}</Text>
      <Icon source="chevron-right" color={'#080d19'} size={32} />
    </Pressable>
  );
}

export default function Profile() {
  return (
    <>
      <Stack.Screen options={{ title: 'Profil' }} />
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
