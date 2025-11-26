import React from 'react';
import {
  Dimensions,
  DimensionValue,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type DialogSize = 'sm' | 'md' | 'lg' | 'full';

interface DialogProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  
  // Size options
  size?: DialogSize;
  width?: DimensionValue; // Custom width (number for px, string for % like "50%")
  height?: DimensionValue; // Custom height
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  
  // Buttons
  showCloseButton?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  
  // Overlay
  overlayColor?: string;
  overlayOpacity?: number;
  closeOnOverlayPress?: boolean;
  
  // Styling
  contentStyle?: ViewStyle;
  headerStyle?: ViewStyle;
  footerStyle?: ViewStyle;
}

export default function Dialog({
  visible,
  onClose,
  title,
  children,
  size = 'md',
  width,
  height,
  minWidth = 280,
  minHeight = 150,
  maxWidth = SCREEN_WIDTH - 40,
  maxHeight = SCREEN_HEIGHT - 100,
  showCloseButton = true,
  showCancelButton = false,
  showConfirmButton = false,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  onCancel,
  onConfirm,
  overlayColor = '#000000',
  overlayOpacity = 0.5,
  closeOnOverlayPress = true,
  contentStyle,
  headerStyle,
  footerStyle,
}: DialogProps) {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  React.useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 200 });
      scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      scale.value = withTiming(0.9, { duration: 150 });
    }
  }, [visible]);

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const dialogAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const getDialogSize = (): ViewStyle => {
    // Custom dimensions take priority
    if (width !== undefined || height !== undefined) {
      const style: ViewStyle = {
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
      };
      
      if (width !== undefined) {
        style.width = width;
      }
      if (height !== undefined) {
        style.height = height;
      }
      
      return style;
    }

    // Preset sizes
    switch (size) {
      case 'sm':
        return {
          width: Math.min(300, maxWidth),
          minHeight,
          maxHeight,
        };
      case 'md':
        return {
          width: Math.min(400, maxWidth),
          minHeight,
          maxHeight,
        };
      case 'lg':
        return {
          width: Math.min(600, maxWidth),
          minHeight,
          maxHeight,
        };
      case 'full':
        return {
          width: maxWidth,
          height: maxHeight,
        };
      default:
        return {
          width: Math.min(400, maxWidth),
          minHeight,
          maxHeight,
        };
    }
  };

  const handleOverlayPress = () => {
    if (closeOnOverlayPress) {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const showFooter = showCancelButton || showConfirmButton;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.container}>
        {/* Overlay */}
        <TouchableWithoutFeedback onPress={handleOverlayPress}>
          <Animated.View
            style={[
              styles.overlay,
              { backgroundColor: overlayColor, opacity: overlayOpacity },
              overlayAnimatedStyle,
            ]}
          />
        </TouchableWithoutFeedback>

        {/* Dialog */}
        <Animated.View
          style={[
            styles.dialog,
            getDialogSize(),
            dialogAnimatedStyle,
          ]}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <View style={[styles.header, headerStyle]}>
              {title && <Text style={styles.title}>{title}</Text>}
              {showCloseButton && (
                <Pressable
                  onPress={onClose}
                  style={styles.closeButton}
                  hitSlop={8}
                >
                  <Text style={styles.closeIcon}>✕</Text>
                </Pressable>
              )}
            </View>
          )}

          {/* Content */}
          <View style={[styles.content, contentStyle]}>
            {children}
          </View>

          {/* Footer */}
          {showFooter && (
            <View style={[styles.footer, footerStyle]}>
              {showCancelButton && (
                <Pressable
                  onPress={handleCancel}
                  style={[styles.button, styles.cancelButton]}
                >
                  <Text style={styles.cancelButtonText}>{cancelText}</Text>
                </Pressable>
              )}
              {showConfirmButton && (
                <Pressable
                  onPress={handleConfirm}
                  style={[styles.button, styles.confirmButton]}
                >
                  <Text style={styles.confirmButtonText}>{confirmText}</Text>
                </Pressable>
              )}
            </View>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  dialog: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#f3f4f6',
  },
  closeIcon: {
    fontSize: 18,
    color: '#6b7280',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f3f4f6',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  confirmButton: {
    backgroundColor: '#2563eb',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});