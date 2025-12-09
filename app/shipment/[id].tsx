import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function ShipmentDetailScreen() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold">Shipment Detail: {id}</Text>
    </View>
  );
}
