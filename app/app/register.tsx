import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <SafeAreaView className="flex-1 bg-white justify-center px-6">
      <View className="space-y-5 gap-2">
        <Text className="text-2xl font-bold text-primary-500 text-center">Đăng ký</Text>
        <TextInput
          className="border border-primary-200 p-4 rounded-md placeholder:text-primary-200"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border border-primary-200 p-4 rounded-md"
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable className="bg-primary-500 p-4 rounded-md">
          <Text className="text-white text-center">Đăng ký</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
