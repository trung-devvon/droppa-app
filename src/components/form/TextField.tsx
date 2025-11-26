import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
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
};

export function TextField({ label, placeholder, value, onChangeText, error, onBlur, type = "text", className }: Props) {
  const [secure, setSecure] = useState(type === "password");
  const keyboardType = type === "number" ? "number-pad" : type === "password" ? "default" : "default";

  return (
    <View className={cn("space-y-2", className)}>
      {label ? <Text className="text-sm text-slate-600">{label}</Text> : null}
      <View className={cn("flex-row items-center rounded-xl border px-3 bg-white", error ? "border-red-500" : "border-slate-300")}>
        <TextInput
          className="flex-1 py-3 text-base"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          secureTextEntry={secure}
          keyboardType={keyboardType as any}
          autoCapitalize={"none"}
        />
        {type === "password" ? (
          <Pressable onPress={() => setSecure((s) => !s)} className="p-2">
            <Ionicons name={secure ? "eye-off" : "eye"} size={20} color="#64748b" />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="text-xs text-red-600">{error}</Text> : null}
    </View>
  );
}
