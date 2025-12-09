import { router } from 'expo-router';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from "react-native-safe-area-context";

import TextField from '@/src/components/form/TextField';
import { rules, useForm } from "@/src/components/form/useForm";
import Button from '@/src/components/ui/Button';
import DroppaTruckLogo from '@/src/components/ui/DroppaTruckLogo';
import Header from '@/src/components/ui/Header';

export default function ForgotPasswordScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { register, handleSubmit } = useForm({
    email: [rules.required('Email là bắt buộc'), rules.email('Email không hợp lệ')],
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      // TODO: Call API to send reset password email
      console.log('Sending reset email to:', data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setEmailSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  });

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <Header title="Quên mật khẩu" />
        
        <View className='flex-1 px-8 gap-10 justify-center pb-20'>
          {!emailSent ? (
            <>
              {/* Icon & Title */}
              <Animated.View entering={FadeInDown.delay(200).duration(500)} className="items-center mb-6">
                <View className="w-24 h-24 bg-primary-100 rounded-full items-center justify-center mb-6">
                  <DroppaTruckLogo size={50} color="#FF6200" />
                </View>
                <Text className="text-3xl font-bold text-gray-900 text-center">
                  Quên mật khẩu?
                </Text>
                <Text className="text-gray-500 text-center mt-3 px-4">
                  Nhập email của bạn, chúng tôi sẽ gửi mã xác nhận để đặt lại mật khẩu
                </Text>
              </Animated.View>

              {/* Form */}
              <Animated.View entering={FadeInUp.delay(400).duration(500)} className="w-full gap-4">
                <TextField
                  label="Email"
                  placeholder="VD: yourmail@gmail.com"
                  type="text"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  {...register('email')}
                />

                {/* Send Button */}
                <Button
                  title="Gửi mã xác nhận"
                  loading={isLoading}
                  variant="primary"
                  size="lg"
                  onPress={onSubmit}
                  className="w-full shadow-lg shadow-primary-200 mt-2"
                />
              </Animated.View>

              {/* Back to Login */}
              <Animated.View entering={FadeInUp.delay(600).duration(500)} className="items-center">
                <Button
                  title="Quay lại đăng nhập"
                  variant="ghost"
                  size="md"
                  onPress={handleBackToLogin}
                />
              </Animated.View>
            </>
          ) : (
            // Success State
            <Animated.View entering={FadeInDown.duration(500)} className="items-center gap-6">
              <View className="w-24 h-24 bg-success-50 rounded-full items-center justify-center mb-4">
                <Text className="text-5xl">✉️</Text>
              </View>
              
              <Text className="text-3xl font-bold text-gray-900 text-center">
                Email đã được gửi!
              </Text>
              
              <Text className="text-gray-500 text-center px-4">
                Chúng tôi đã gửi mã xác nhận đến email của bạn. Vui lòng kiểm tra hộp thư và làm theo hướng dẫn.
              </Text>

              <View className="w-full gap-3 mt-4">
                <Button
                  title="Mở ứng dụng Email"
                  variant="primary"
                  size="lg"
                  onPress={() => {
                    // TODO: Open email app
                    console.log('Open email app');
                  }}
                  className="w-full"
                />
                
                <Button
                  title="Quay lại đăng nhập"
                  variant="outline"
                  size="lg"
                  onPress={handleBackToLogin}
                  className="w-full"
                />
              </View>

              <Text className="text-gray-400 text-sm text-center mt-4">
                Không nhận được email?{' '}
                <Text 
                  className="text-primary-500 font-semibold"
                  onPress={() => setEmailSent(false)}
                >
                  Gửi lại
                </Text>
              </Text>
            </Animated.View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
