import { useEffect, useState } from 'react';

import { CameraView, useCameraPermissions } from 'expo-camera';
import { parse, ParseResult } from 'mrz';
import { useRef } from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import MlkitOcr from 'react-native-mlkit-ocr';
import { useStore } from '~/store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';
import ScanResult from './_scan-components/scan-result';

const borderWidth = Dimensions.get('window').width - 20;
const borderHeight = borderWidth / 1.6;

function ScanDocument() {
  const { profile, setProfile, setGrantedPolicies } = useStore();

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  const [result, setResult] = useState<ParseResult | undefined>(undefined);
  function doJob(timer: NodeJS.Timeout) {
    if (cameraRef.current) {
      cameraRef.current
        ?.takePictureAsync({ skipProcessing: false, shutterSound: false })
        .then((data) => {
          if (data) {
            MlkitOcr.detectFromUri(data.uri).then((recognizedText) => {
              const fullText = recognizedText
                .map((t) => t.text)
                .join('\n')
                .replaceAll(' ', '');
              const lines = fullText.split(/\r?\n/);
              while (lines.length > 0) {
                if (!lines[0].startsWith('I')) {
                  lines.shift();
                  continue;
                }
                break;
              }
              if (lines.length >= 3) {
                const res = lines[0] + '\n' + lines[1] + '\n' + lines[2];
                try {
                  const result = parse(res);
                  setResult(result);
                  clearInterval(timer);
                } catch (error) {
                  console.log(error);
                }
              }
            });
          }
        });
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      doJob(timer);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>
          <Text>Grant permission</Text>
        </Button>
      </View>
    );
  }

  if (result) {
    return <ScanResult parseResult={result} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mode="picture"
        autofocus="on"
        animateShutter={false}>
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <View className="absolute z-10 mt-4 flex-row justify-start px-6">
            <Button
              icon="arrow-left"
              onPress={() => router.back()}
              mode="text"
              textColor="#fff"
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text className="text-xl font-bold">Geri</Text>
            </Button>
          </View>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
            <View
              // onPress={() => doJob()}
              style={{
                width: borderWidth,
                height: borderHeight,
                borderWidth: 2,
                borderColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderStyle: 'dashed',
              }}>
              <Text
                style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
                Kimliğinizi bu alana yerleştirin
              </Text>
            </View>
            {/* <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} /> */}
          </View>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </View>
      </CameraView>
    </View>
  );
}
export default ScanDocument;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
