import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
  style?: ViewStyle;
  animated?: boolean;
}

export default function Header({
  title,
  showBackButton = true,
  onBackPress,
  rightAction,
  style,
  animated = true,
}: HeaderProps) {
  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  const content = (
    <View style={[styles.container, style]}>
      {/* Left: Back Button */}
      <View style={styles.leftSection}>
        {showBackButton && (
          <Pressable
            onPress={handleBackPress}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.backButtonPressed,
            ]}
          >
            <ArrowLeft size={24} color="#FF6200" strokeWidth={2.5} />
          </Pressable>
        )}
      </View>

      {/* Center: Title */}
      <View style={styles.centerSection}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right: Custom Action */}
      <View style={styles.rightSection}>{rightAction}</View>
    </View>
  );

  if (animated) {
    return (
      <Animated.View entering={FadeInDown.delay(100).duration(400)}>
        {content}
      </Animated.View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    // Z-index cao để luôn ở trên content (toast/loading thường có zIndex 999+)
    zIndex: 100,
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    // Shadow cho Android
    elevation: 2,
  },
  leftSection: {
    width: 40,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  rightSection: {
    width: 40,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  backButtonPressed: {
    backgroundColor: '#FFF3E0', // primary-50
    opacity: 0.8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#262626', // gray-800
    textAlign: 'center',
  },
});
