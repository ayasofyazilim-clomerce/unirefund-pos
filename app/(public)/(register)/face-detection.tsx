import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
import {
  Face,
  FaceDetectionOptions,
  useFaceDetector,
} from 'react-native-vision-camera-face-detector';
import { Worklets } from 'react-native-worklets-core';
import { CircularProgress } from '~/components/ui/CircularProgress';

function FaceDetection() {
  const [livenessTest, setLivenessTest] = useState({
    smile: false,
    turnLeft: false,
    turnRight: false,
    leftEyeBlink: false,
    rightEyeBlink: false,
  });

  const progress =
    Object.values(livenessTest).filter((value) => value).length / Object.keys(livenessTest).length;

  const device = useCameraDevice('front');
  const faceDetectionOptions = useRef<FaceDetectionOptions>({
    classificationMode: 'all',
    landmarkMode: 'all',
  }).current;
  const { detectFaces } = useFaceDetector(faceDetectionOptions);

  const handleDetectedFaces = Worklets.createRunOnJS((faces: Face[]) => {
    if (faces.length === 0) return;

    if (!livenessTest.smile) {
      if (faces[0].smilingProbability > 0.9) {
        setTimeout(() => {
          setLivenessTest({ ...livenessTest, smile: true });
        }, 500);
      }
      return;
    }

    if (!livenessTest.turnLeft) {
      if (faces[0].yawAngle > 20) {
        setTimeout(() => {
          setLivenessTest({ ...livenessTest, turnLeft: true });
        }, 500);
      }
      return;
    }
    if (!livenessTest.turnRight) {
      if (faces[0].yawAngle < -20) {
        setTimeout(() => {
          setLivenessTest({ ...livenessTest, turnRight: true });
        }, 500);
      }
      return;
    }

    if (!livenessTest.leftEyeBlink) {
      if (faces[0].rightEyeOpenProbability < 0.1) {
        setTimeout(() => {
          setLivenessTest({ ...livenessTest, leftEyeBlink: true });
        }, 500);
      }
      return;
    }
    if (!livenessTest.rightEyeBlink) {
      if (faces[0].leftEyeOpenProbability < 0.1) {
        setTimeout(() => {
          setLivenessTest({ ...livenessTest, rightEyeBlink: true });
        }, 500);
      }
      return;
    }
  });

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      const faces = detectFaces(frame);
      handleDetectedFaces(faces);
    },
    [handleDetectedFaces]
  );
  const getLivenessInstruction = () => {
    if (!livenessTest.smile) return 'Gülümseyin';
    if (!livenessTest.turnLeft) return 'Kafanızı sola doğru çevirin';
    if (!livenessTest.turnRight) return 'Kafanızı sağa dogru çevirin';
    if (!livenessTest.leftEyeBlink) return 'Sol gözünüzü kapatın';
    if (!livenessTest.rightEyeBlink) return 'Sağ gözünüzü kapatın';

    setTimeout(() => {
      if (router.canGoBack()) {
        router.back();
      }
    }, 1000);
    return 'Tebrikler';
  };
  if (!device) return null;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress progress={progress} radius={108}>
        <View className="relative h-[200px] w-[200px] overflow-hidden rounded-full">
          <Camera
            style={StyleSheet.absoluteFill}
            frameProcessor={frameProcessor}
            device={device}
            isActive={true}
          />
        </View>
      </CircularProgress>
      <Text className="mt-4 text-xl">{getLivenessInstruction()}</Text>
    </View>
  );
}
export default FaceDetection;
