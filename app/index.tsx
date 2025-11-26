import Button from "@/src/components/ui/Button";
import Dialog from "@/src/components/ui/Dialog";
import { toast } from "@/src/components/ui/Toast";
import { router } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";

export default function HomeScreen() {
  const [dialog2, setDialog2] = useState(false);
  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      {/* Logo hoặc Ảnh minh họa (Placeholder) */}
      <View className="w-32 h-32 bg-orange-100 rounded-full items-center justify-center mb-8">
        <Text className="text-4xl">📦</Text>
      </View>

      <Text className="text-2xl font-bold text-gray-900 mb-2">
        Giao Hàng Nhanh
      </Text>
      <Text className="text-gray-500 text-center mb-10">
        Ứng dụng vận chuyển tối ưu cho người Việt. Nhanh chóng, an toàn và tiết
        kiệm.
      </Text>

      {/* Sử dụng Component CustomButton */}
      <View className="w-full gap-4">
        {/* Dùng href để chuyển trang (thay thế router.push) */}
        <Text className="text-blue-600">text color</Text>
        <Button
          title="Đăng nhập ngay"
          onPress={() => router.push("./app/login")}
          variant="primary"
          size="lg"
        />

        <Button
          title="Click me"
          onPress={() => console.log("Pressed")}
          variant="outline"
          size="md"
        />

        <View className="w-full border ">
         <Button 
        title="2. Confirm Dialog" 
        onPress={() => setDialog2(true)} 
      />
      <Dialog
        visible={dialog2}
        onClose={() => setDialog2(false)}
        title="Xác nhận xóa"
        showCancelButton
        showConfirmButton
        cancelText="Hủy"
        confirmText="Xóa"
        overlayColor="rgba(0, 0, 0, 0.5)"
        onCancel={() => {
          console.log('Đã hủy');
          setDialog2(false);
        }}
        onConfirm={() => {
          console.log('Đã xác nhận xóa');
          // Dialog tự đóng sau khi confirm
        }}
      >
        <Text>Bạn có chắc chắn muốn xóa mục này không?</Text>
        <Text style={{ color: '#dc2626', marginTop: 8 }}>
          Hành động này không thể hoàn tác!
        </Text>
      </Dialog>
        </View>
        <View>
          <Button variant="danger" size="lg" title="show toast" onPress={() => toast.show('Custom message', 'success', 3000)} />
          <Button variant="primary" size="lg" title="show toast" onPress={() => toast.show('HI THERE! I am a info toast! and I will disappear in 3 seconds', 'info', 3000)} />
        </View>
      </View>
    </View>
  );
}
