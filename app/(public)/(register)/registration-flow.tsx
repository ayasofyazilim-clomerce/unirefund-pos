import { router, Stack } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';
import SubmitButton from '~/components/Button.Submit';
import Stepper from '~/components/Stepper';
import { useStore } from '~/store/store';
function RegistrationFlow() {
  const { profile, setProfile, setGrantedPolicies } = useStore();
  const isProfileCompleted = !!profile?.name && !!profile?.surname && !!profile.phoneNumber;
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
          disabled={!isProfileCompleted || true}
          onPress={() => {
            console.log(3);
          }}
        />
        <View className="mt-4">
          <SubmitButton
            mode="contained"
            icon={'arrow-right'}
            contentStyle={{ flexDirection: 'row-reverse' }}
            onSubmit={async () => router.replace('/(tabs)')}
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
