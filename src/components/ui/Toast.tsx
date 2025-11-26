import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastConfig {
  message: string;
  type?: ToastType;
  duration?: number;
  icon?: string;
}

export interface ToastRef {
  show: (config: ToastConfig) => void;
  hide: () => void;
}

const Toast = forwardRef<ToastRef, object>((_, ref) => {
  const insets = useSafeAreaInsets();
  
  const translateY = useSharedValue(-100);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  
  const [config, setConfig] = React.useState<ToastConfig>({
    message: '',
    type: 'info',
    duration: 3000,
  });
  const [visible, setVisible] = React.useState(false);
  const timeoutRef = React.useRef<any>(null);

  const hideToast = () => {
    translateY.value = withTiming(-100, { duration: 300 });
    opacity.value = withTiming(0, { duration: 300 });
    scale.value = withTiming(0.8, { duration: 300 });
    
    setTimeout(() => {
      setVisible(false);
      translateX.value = 0;
    }, 300);
  };

  const showToast = (newConfig: ToastConfig) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setConfig({
      type: 'info',
      duration: 3000,
      ...newConfig,
    });
    setVisible(true);

    // Animation hiện toast
    translateY.value = withSpring(0, {
      damping: 15,
      stiffness: 150,
    });
    opacity.value = withTiming(1, { duration: 300 });
    scale.value = withSpring(1, {
      damping: 12,
      stiffness: 200,
    });

    // Auto hide
    const duration = newConfig.duration ?? 3000;
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        hideToast();
      }, duration);
    }
  };

  useImperativeHandle(ref, () => ({
    show: showToast,
    hide: hideToast,
  }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Cancel auto-hide khi bắt đầu vuốt
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    })
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd((event) => {
      const shouldDismiss = Math.abs(event.translationX) > 100 || Math.abs(event.velocityX) > 500;
      
      if (shouldDismiss) {
        const direction = event.translationX > 0 ? 1 : -1;
        translateX.value = withTiming(direction * SCREEN_WIDTH, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
        
        runOnJS(hideToast)();
      } else {
        translateX.value = withSpring(0, {
          damping: 15,
          stiffness: 150,
        });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const getToastStyle = () => {
    switch (config.type) {
      case 'success':
        return {
          backgroundColor: '#10b981',
          icon: config.icon || '✓',
        };
      case 'error':
        return {
          backgroundColor: '#ef4444',
          icon: config.icon || '✕',
        };
      case 'warning':
        return {
          backgroundColor: '#f59e0b',
          icon: config.icon || '⚠',
        };
      case 'info':
      default:
        return {
          backgroundColor: '#3b82f6',
          icon: config.icon || 'ℹ',
        };
    }
  };

  if (!visible) return null;

  const toastStyle = getToastStyle();

  return (
    <View style={[styles.container, { top: insets.top + 20 }]} pointerEvents="box-none">
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.toast,
            { backgroundColor: toastStyle.backgroundColor },
            animatedStyle,
          ]}
        >
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{toastStyle.icon}</Text>
          </View>
          <Text style={styles.message} numberOfLines={2}>
            {config.message}
          </Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

Toast.displayName = 'Toast';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 9999, // Full radius
    maxWidth: SCREEN_WIDTH - 40,
    minWidth: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 15,
    color: '#ffffff',
    fontWeight: '600',
    flex: 1,
  },
});

export default Toast;

// ============================================
// PROVIDER COMPONENT - Để dùng Toast global
// ============================================

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = React.useRef<ToastRef>(null);

  React.useEffect(() => {
    // Gán toast ref vào global để có thể gọi từ bất kỳ đâu
    (global as any).toast = toastRef.current;
  }, []);

  return (
    <>
      {children}
      <Toast ref={toastRef} />
    </>
  );
};

// ============================================
// HELPER FUNCTIONS - Để gọi toast dễ dàng
// ============================================

export const toast = {
  show: (message: string, type: ToastType = 'info', duration = 3000) => {
    (global as any).toast?.show({ message, type, duration });
  },
  success: (message: string, duration = 3000) => {
    (global as any).toast?.show({ message, type: 'success', duration });
  },
  error: (message: string, duration = 3000) => {
    (global as any).toast?.show({ message, type: 'error', duration });
  },
  warning: (message: string, duration = 3000) => {
    (global as any).toast?.show({ message, type: 'warning', duration });
  },
  info: (message: string, duration = 3000) => {
    (global as any).toast?.show({ message, type: 'info', duration });
  },
  hide: () => {
    (global as any).toast?.hide();
  },
};