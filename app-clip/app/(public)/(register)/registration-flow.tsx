import { router, Stack } from 'expo-router';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import SubmitButton from '~/components/ui/Button.Submit';
import Stepper from '~/components/ui/Stepper';
import { useRegistrationStore, useStore } from '~/store/store';

function RegistrationFlow() {
  const { profile } = useStore();
  const { scannedDocument } = useRegistrationStore();
  const isProfileCompleted = !!profile?.name && !!profile?.surname && !!profile.phoneNumber;
  const [isLivenessChecked, setLivenessChecked] = useState(false);
  console.log('test');
  async function redirectToHome() {
    if (router.canDismiss()) {
      router.dismissAll();
    }
  }

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View className="mb-4">
          <Text className="text-base font-semibold text-black">
            Uygulamayı tam anlamıyla kullanabilmek için aşağıdaki adımları tamamlayın.
          </Text>
        </View>

        <Stepper
          step={1}
          title={'Hesap oluştur'}
          description={'Hesabını başarıyla oluşturdun.'}
          completed={true}
        />
        <Stepper
          step={2}
          title={'Pasaport doğrulaması'}
          description={'Profil bilgilerini doğrulamak için pasaportunuzu okutun.'}
          completed={!!scannedDocument}
          onPress={() => {
            router.push('/(public)/(register)/scan-document');
          }}
        />
        <Stepper
          step={3}
          title={'Profilini tamamla'}
          description={'Kisisel bilgilerini girerek profilini tamamla'}
          completed={isProfileCompleted}
          disabled={!scannedDocument}
          onPress={() => {
            router.push('/(public)/(register)/complete-profile');
          }}
        />
        <Stepper
          step={4}
          title={'Yüz doğrulaması'}
          description={'Profil bilgilerini doğrulamak için yüzünüzü tanıtın.'}
          completed={isLivenessChecked}
          disabled={!isProfileCompleted}
          onPress={() => {
            setLivenessChecked(true);
            router.push('/(public)/(register)/face-detection');
          }}
        />
        <View className="mt-4">
          <SubmitButton
            mode="contained"
            icon={'arrow-right'}
            contentStyle={{ flexDirection: 'row-reverse' }}
            onSubmit={async () => redirectToHome()}
            disabled={!isProfileCompleted}>
            Uygulamaya devam et
          </SubmitButton>
        </View>
      </View>
    </>
  );
}
export default RegistrationFlow;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
