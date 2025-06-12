import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

const TagDetail = () => {
  const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>Details of tag {id} </Text>
    </View>
  );
};

export default TagDetail;
