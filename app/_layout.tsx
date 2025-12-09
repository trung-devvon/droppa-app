import { ToastProvider } from "@/src/components/ui/Toast";
import { queryClient } from "@/src/lib/queryClient";
import { useAppStore } from "@/src/stores/useAppStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  // Initialize stores on app start
  useEffect(() => {
    const initializeStores = async () => {
      await Promise.all([
        useAuthStore.getState().initialize(),
        useAppStore.getState().initialize(),
      ]);
    };

    initializeStores();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
