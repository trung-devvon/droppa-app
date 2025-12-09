import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

import TextField from '@/src/components/form/TextField';
import { rules, useForm } from "@/src/components/form/useForm";
import Button from '@/src/components/ui/Button';
import DroppaTruckLogo from '@/src/components/ui/DroppaTruckLogo';
import Header from '@/src/components/ui/Header';

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm({
    email: [rules.required('Email là bắt buộc'), rules.email('Email không hợp lệ')],
    password: [rules.required('Mật khẩu là bắt buộc'), rules.minLength(6, 'Mật khẩu phải có ít nhất 6 ký tự')],
    confirmPassword: [rules.required('Xác nhận mật khẩu là bắt buộc')]
  });

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.confirmPassword) {
      // TODO: Show error toast
      console.log('Mật khẩu không khớp');
      return;
    }
    console.log(data);
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <Header title="Đăng ký" />
        
        <View className='flex-1 px-8 gap-8 justify-center pb-10'>
          {/* Logo & Title */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)} className="items-center mb-4">
            <View className="w-24 h-24 bg-primary-100 rounded-3xl items-center justify-center mb-6 rotate-3">
              <DroppaTruckLogo size={60} />
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center">
              Tạo tài khoản Droppa
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Điền thông tin để bắt đầu giao hàng
            </Text>
          </Animated.View>

          {/* Form Fields */}
          <Animated.View entering={FadeInUp.delay(400).duration(500)} className="w-full gap-4">
            <TextField
              label="Email"
              placeholder="VD: yourmail@gmail.com"
              type="text"
              autoCapitalize="none"
              keyboardType="email-address"
              {...register('email')}
            />
            
            <TextField
              label="Mật khẩu"
              placeholder="Ít nhất 6 ký tự"
              type="password"
              {...register('password')}
            />

            <TextField
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
              type="password"
              {...register('confirmPassword')}
            />

            <Text className="text-xs text-gray-400 mt-1">
              Bạn có thể cập nhật họ tên và số điện thoại sau trong phần Hồ sơ
            </Text>

            {/* Register Button */}
            <Button
              title="Đăng ký"
              loading={isLoading}
              variant="primary"
              size="lg"
              onPress={onSubmit}
              className="w-full shadow-lg shadow-primary-200 mt-2"
            />
          </Animated.View>

          {/* Footer Login */}
          <Animated.View entering={FadeInUp.delay(600).duration(500)} className="flex-row justify-center">
            <Text className="text-gray-500">Đã có tài khoản? </Text>
            <Link href="./login">
              <Text className="text-primary-500 font-bold">Đăng nhập ngay</Text>
            </Link>
          </Animated.View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
