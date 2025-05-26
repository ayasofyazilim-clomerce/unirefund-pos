import { useState } from 'react';

import { CameraCapturedPicture, CameraView, useCameraPermissions } from 'expo-camera';
import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { router } from 'expo-router';
import { parse, ParseResult } from 'mrz';
import { useRef } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import MlkitOcr, { MlkitOcrResult } from 'react-native-mlkit-ocr';
import { Button } from 'react-native-paper';
import ScanResult from '~/components/pages/scan-result';
import { useRegistrationStore } from '~/store/store';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const scanningAreaWidth = deviceWidth - 20;
const scanningAreaHeight = scanningAreaWidth / 1.6;

function ScanDocument() {
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);
  const isDetecting = useRef(false);
  const [image, setImage] = useState<string | null>(null);
  const { scannedDocument, setScannedDocument } = useRegistrationStore();

  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();

  function takeAPicture() {
    if (isDetecting.current) return;

    if (cameraRef.current) {
      isDetecting.current = true;
      cameraRef.current
        .takePictureAsync({ shutterSound: false })
        .then((data) => handlePicture(data));
    }
  }
  function prepareText(ocrResult: MlkitOcrResult) {
    const fullText = ocrResult
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
      return lines[0] + '\n' + lines[1] + '\n' + lines[2];
    }
    return null;
  }
  function handlePicture(data: CameraCapturedPicture) {
    async function cropImage() {
      const image = ImageManipulator.manipulate(data.uri);
      const scaleY = data.height / deviceHeight;

      const photoWidth = Math.round(scanningAreaWidth * scaleY);
      const photoHeight = Math.round(scanningAreaHeight * scaleY);

      const crop = {
        originX: (data.width - photoWidth) / 2,
        originY: (data.height - photoHeight) / 2,
        width: photoWidth,
        height: photoHeight,
      };
      image.crop(crop);
      const croppedImage = await image.renderAsync();
      const croppedImageUri = (await croppedImage.saveAsync({ format: SaveFormat.PNG })).uri;
      return croppedImageUri;
    }
    if (!data || !timer.current) return;

    cropImage().then((uri) => {
      MlkitOcr.detectFromUri(uri).then((ocrResult) => {
        const recognizedText = prepareText(ocrResult);
        if (recognizedText) {
          try {
            const result = parse(recognizedText, { autocorrect: true });
            setScannedDocument(
              result as ParseResult & { fields: { firstName: string; lastName: string } }
            );
            setImage(uri);

            clearInterval(timer.current);
          } catch (error) {}
        }
        isDetecting.current = false;
      });
    });
  }
  function onCameraReady() {
    timer.current = setInterval(() => {
      takeAPicture();
    }, 1000);
    return () => clearInterval(timer.current);
  }

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

  if (scannedDocument && image) {
    return <ScanResult parseResult={scannedDocument} image={image} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9 }}>
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
          <View style={{ width: 10, backgroundColor: 'rgba(0,0,0,0.5)' }} />
          <View
            style={{
              width: scanningAreaWidth,
              height: scanningAreaHeight,
              borderWidth: 2,
              borderColor: 'white',
              justifyContent: 'center',
              borderStyle: 'dashed',
            }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}>
              Kimliğinizi bu alana yerleştirin
            </Text>
            {image && (
              <Image
                source={{ uri: image }}
                style={{
                  width: scanningAreaWidth - 60,
                  aspectRatio: scanningAreaWidth / scanningAreaHeight, // otomatik bulundu
                  resizeMode: 'contain',
                }}
              />
            )}
          </View>
          <View style={{ width: 10, backgroundColor: 'rgba(0,0,0,0.5)' }} />
        </View>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </View>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        mode="picture"
        autofocus="on"
        onCameraReady={onCameraReady}
        zoom={0}
        animateShutter={false}
      />
    </View>
  );
}
export default ScanDocument;
