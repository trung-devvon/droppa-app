import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-8 space-y-5">
        <Text className="text-2xl font-bold text-foreground">Đăng nhập</Text>

       
      </View>

     
    </SafeAreaView>
  );
}
