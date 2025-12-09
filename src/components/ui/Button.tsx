import React from 'react';
import { ActivityIndicator, Pressable, PressableProps, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'children' | 'style'> {
  title?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  children,
  ...pressableProps
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
  };

  const getButtonStyle = (): ViewStyle[] => {
    const styles: ViewStyle[] = [baseStyles.button];

    // Variant styles
    switch (variant) {
      case 'primary':
        styles.push(variantStyles.primary);
        break;
      case 'secondary':
        styles.push(variantStyles.secondary);
        break;
      case 'outline':
        styles.push(variantStyles.outline);
        break;
      case 'ghost':
        styles.push(variantStyles.ghost);
        break;
      case 'danger':
        styles.push(variantStyles.danger);
        break;
    }

    // Size styles
    switch (size) {
      case 'sm':
        styles.push(sizeStyles.sm);
        break;
      case 'md':
        styles.push(sizeStyles.md);
        break;
      case 'lg':
        styles.push(sizeStyles.lg);
        break;
    }

    if (fullWidth) {
      styles.push(baseStyles.fullWidth);
    }

    if (disabled) {
      styles.push(baseStyles.disabled);
    }

    return styles;
  };

  const getTextStyle = (): TextStyle[] => {
    const styles: TextStyle[] = [baseStyles.text];

    // Text color based on variant
    if (variant === 'outline' || variant === 'ghost') {
      styles.push(textStyles.colored);
    } else if (variant === 'secondary') {
      styles.push(textStyles.secondary);
    } else {
      styles.push(textStyles.white);
    }

    // Text size
    switch (size) {
      case 'sm':
        styles.push(textStyles.sm);
        break;
      case 'md':
        styles.push(textStyles.md);
        break;
      case 'lg':
        styles.push(textStyles.lg);
        break;
    }

    return styles;
  };

  const getSpinnerColor = (): string => {
    if (variant === 'outline' || variant === 'ghost') {
      return '#FF6200'; // Cam cho outline và ghost
    } else if (variant === 'secondary') {
      return '#993D00'; // Cam đậm cho secondary
    }
    return '#ffffff'; // Trắng cho primary và danger
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[animatedStyle, ...getButtonStyle(), style]}
      {...pressableProps}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getSpinnerColor()} />
      ) : (
        <>
          {children || (
            <>
              {leftIcon && <Text style={baseStyles.icon}>{leftIcon}</Text>}
              <Text style={getTextStyle()}>{title}</Text>
              {rightIcon && <Text style={baseStyles.iconRight}>{rightIcon}</Text>}
            </>
          )}
        </>
      )}
    </AnimatedPressable>
  );
}

const baseStyles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  icon: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
});

const variantStyles = StyleSheet.create({
  primary: {
    backgroundColor: '#FF6200', // Cam chính
  },
  secondary: {
    backgroundColor: '#FFCC80', // Cam nhạt (primary-200)
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6200', // Viền cam
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    backgroundColor: '#E31E24', // Đỏ từ tailwind config
  },
});

const sizeStyles = StyleSheet.create({
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
});

const textStyles = StyleSheet.create({
  white: {
    color: '#ffffff',
  },
  colored: {
    color: '#FF6200', // Chữ cam cho outline và ghost
  },
  secondary: {
    color: '#993D00', // Chữ cam đậm cho secondary button
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
});