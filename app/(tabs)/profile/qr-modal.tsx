import { Modal, Pressable, Text, View } from 'react-native';

export default function QRModal({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}) {
  return (
    <Modal
      animationType="slide"
      backdropColor={'#ffffffaa'}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View className="flex-1 items-center justify-center">
        <Text className="font-bold">QR Kod!</Text>
        <Pressable
          className="mt-4 rounded-lg border border-gray-700 px-3 py-2"
          onPress={() => setModalVisible(!modalVisible)}>
          <Text className="text-center text-gray-700">Kapat</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
