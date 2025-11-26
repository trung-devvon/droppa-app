import { ToastProvider } from "@/src/components/ui/Toast";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ToastProvider>
        <SafeAreaProvider>
          {/* StatusBar để chỉnh màu thanh pin/sóng phía trên cùng */}
          <StatusBar style="dark" backgroundColor="white" />

          {/* Stack quản lý việc chuyển màn hình */}
          <Stack
            screenOptions={{
              headerShown: false,
              animation: "slide_from_right",
              contentStyle: { backgroundColor: "#9FAFB" }, // (bg-gray-50)
            }}
          >
            {/* Định nghĩa các màn hình chính */}
            <Stack.Screen name="index" />
            <Stack.Screen name="login" options={{ animation: "fade" }} />
          </Stack>
        </SafeAreaProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
}
