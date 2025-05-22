import { router, Stack } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';
import { logoutUser } from '~/actions/auth/logoutUser';
import SubmitButton from '~/components/Button.Submit';
import Stepper from '~/components/Stepper';
import { useStore } from '~/store/store';

function RegistrationFlow() {
  const { profile, setProfile, setGrantedPolicies } = useStore();
  const isProfileCompleted = !!profile?.name && !!profile?.surname && !!profile.phoneNumber;

  async function redirectToHome() {
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace('/(tabs)');
  }
  async function redirectToLogin() {
    if (router.canDismiss()) {
      router.dismissAll();
    }
    await logoutUser();
    router.replace('/login');
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
          title={'Profilini tamamla'}
          description={'Kisisel bilgilerini girerek profilini tamamla'}
          completed={isProfileCompleted}
          disabled={false}
          onPress={() => {
            router.push('/(public)/(register)/complete-profile');
          }}
        />
        <Stepper
          step={3}
          title={'Pasaport doğrulaması'}
          description={'Profil bilgilerini doğrulamak için pasaportunuzu okutun.'}
          completed={false}
          disabled={!isProfileCompleted}
          onPress={() => {
            router.push('/(public)/(register)/scan-document');
          }}
        />
        <Stepper
          step={4}
          title={'Yüz doğrulaması'}
          description={'Profil bilgilerini doğrulamak için yüzünüzü tanıtın.'}
          completed={false}
          disabled={!isProfileCompleted} //!isProfileCompleted || !!profile.phoneNumberConfirmed}
          onPress={() => {
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
        {!isProfileCompleted && (
          <View className="mt-4">
            <SubmitButton
              mode="outlined"
              textColor="gray"
              icon={'logout'}
              onSubmit={async () => redirectToLogin()}>
              Çıkış yap
            </SubmitButton>
          </View>
        )}
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
