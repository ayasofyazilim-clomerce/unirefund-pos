import { router } from 'expo-router';
import { ParseResult } from 'mrz';

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import SubmitButton from '~/components/ui/Button.Submit';

function ScanResult({ parseResult }: { parseResult: ParseResult }) {
  async function onSubmit() {
    router.back();
  }
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {parseResult.details.map((detail) => {
              return (
                <View className="mt-3 flex flex-row gap-4" key={detail.label}>
                  <Text className="font-bold">{detail.label}:</Text>
                  <Text>{detail.value}</Text>
                </View>
              );
            })}

            <SubmitButton
              className="mt-auto"
              mode="contained"
              icon={'arrow-right'}
              contentStyle={{ flexDirection: 'row-reverse' }}
              onSubmit={onSubmit}>
              Profili Kaydet
            </SubmitButton>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
}
export default ScanResult;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
