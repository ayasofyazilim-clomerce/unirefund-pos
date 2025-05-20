import { Stack } from 'expo-router';

import { StyleSheet, Text, View } from 'react-native';
import Stepper from '~/components/Stepper';
function RegistrationFlow() {
  return (
    <>
      <Stack.Screen options={{ title: 'Ev', headerShown: false }} />
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
          onPress={() => {
            console.log(1);
          }}
        />
        <Stepper
          step={2}
          title={'Profilini tamamla'}
          description={'Kisisel bilgilerini girerek profilini tamamla'}
          completed={false}
          disabled={false}
          onPress={() => {
            console.log(2);
          }}
        />
        <Stepper
          step={3}
          title={'Pasaport doğrulaması'}
          description={'Profil bilgilerini doğrulamak için pasaportunuzu okutun.'}
          completed={false}
          disabled={true}
          onPress={() => {
            console.log(3);
          }}
        />
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
