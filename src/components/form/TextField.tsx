import { Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { cn } from "../lib/cn";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (t: string) => void;
  error?: string;
  onBlur?: () => void;
  type?: "text" | "number" | "password";
  className?: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: KeyboardTypeOptions; // Thêm prop này để linh hoạt hơn
};

export default function TextField({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  onBlur,
  type = "text",
  className,
  autoCapitalize = 'none',
  keyboardType, // Nhận prop mới
}: Props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPasswordType = type === "password";
  const secureTextEntry = isPasswordType && !isPasswordVisible;

  // Xác định keyboardType: ưu tiên prop, nếu không thì dựa vào type
  const resolvedKeyboardType = keyboardType || (type === "number" ? "numeric" : "default");

  return (
    <View className={cn("w-full", className)}>
      {/* Label */}
      {label && (
        <Text className="text-sm font-semibold text-gray-700 mb-2">
          {label}
        </Text>
      )}
      
      {/* Input Container */}
      <View className="relative">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={() => {
            setIsFocused(false);
            onBlur?.();
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          secureTextEntry={secureTextEntry}
          keyboardType={resolvedKeyboardType}
          autoCapitalize={autoCapitalize}
          style={[
            styles.input,
            error && styles.inputError,
            isFocused && !error && styles.inputFocused,
            isPasswordType && styles.inputWithIcon,
          ]}
          className={cn(
            "text-gray-900 text-base font-medium",
            error && "text-danger"
          )}
        />

        {/* Password Toggle Icon */}
        {isPasswordType && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute right-3 top-0 h-14 items-center justify-center"
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={22} color="#9ca3af" strokeWidth={2} />
            ) : (
              <Eye size={22} color="#9ca3af" strokeWidth={2} />
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* Error Message */}
      {error && (
        <View className="flex-row items-center mt-1.5 ml-1">
          <Text className="text-danger text-xs font-medium">
            {error}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 0, // Important: set to 0 to fix vertical alignment
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5', // gray-200
    backgroundColor: '#FAFAFA', // gray-50
    fontSize: 16,
    fontWeight: '500',
    color: '#171717', // gray-900
    // Fix vertical text alignment
    textAlignVertical: 'center',
  },
  inputFocused: {
    borderColor: '#FF6200', // primary-500
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF6200',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  inputError: {
    borderColor: '#E31E24', // danger
    backgroundColor: '#FEF2F2', // red-50
  },
  inputWithIcon: {
    paddingRight: 48,
  },
});
