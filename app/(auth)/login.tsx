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

import { useRouter } from 'expo-router';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    email: [rules.required('Email is required'), rules.email('Email is invalid')],
    password: [rules.required('Password is required'), rules.minLength(6, 'Password must be at least 6 characters')]
  })

  const onSubmit = handleSubmit((data) => {
    router.push('/home');
  })
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <Header title="Đăng nhập" />
        
        <View className='flex-1 px-8 gap-10 justify-center pb-20'>
          {/* Logo & Title */}
          <Animated.View entering={FadeInDown.delay(200).duration(500)} className="items-center mb-10">
            <View className="w-24 h-24 bg-primary-100 rounded-3xl items-center justify-center mb-6 rotate-3">
              <DroppaTruckLogo size={60} />
            </View>
            <Text className="text-3xl font-bold text-gray-900 text-center">
              Chào mừng trở lại!
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Đăng nhập để quản lý đơn hàng của bạn
            </Text>
          </Animated.View>
          {/* Form Fields */}

          <Animated.View entering={FadeInUp.delay(400).duration(500)} className="w-full gap-4">
            <TextField
              label="Email"
              placeholder="VD: yourmail@gmail.com"
              type="text"
              autoCapitalize="none"
              {...register('email')}
            />
            <TextField
              label="Mật khẩu"
              placeholder="********"
              type="password"
              {...register('password')}
            />

            <View className="flex-row justify-end mb-8 mt-1">
              <Link href="./forgot-password">
                <Text className="text-primary-500 font-medium text-sm">
                  Quên mật khẩu?
                </Text>
              </Link>
            </View>

            {/* Login Button */}
            <Button
              title="Đăng nhập"
              loading={isLoading}
              onPress={() => router.push('/home')}
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-primary-200"
            />
          </Animated.View>

           {/* Footer Register */}
          <Animated.View entering={FadeInUp.delay(600).duration(500)} className="flex-row justify-center">
            <Text className="text-gray-500">Chưa có tài khoản? </Text>
            <Link href="./register">
              <Text className="text-primary-500 font-bold">Đăng ký ngay</Text>
            </Link>
          </Animated.View>

        </View>
      </SafeAreaView>

     
    </TouchableWithoutFeedback>
  );
}
