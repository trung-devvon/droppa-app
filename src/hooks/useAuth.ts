import { authService } from '@/src/services/authService';
import { useAuthStore } from '@/src/stores/useAuthStore';
import type { LoginRequest, RegisterRequest } from '@/src/types/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

/**
 * useAuth hook - Combines Zustand store with React Query mutations
 */
export function useAuth() {
  const queryClient = useQueryClient();
  const { login: loginStore, logout: logoutStore } = useAuthStore();

  /**
   * Login mutation
   */
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: async (response) => {
      // Save to Zustand store and AsyncStorage
      await loginStore(response.user, response.token);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  /**
   * Register mutation
   */
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: async (response) => {
      // Save to Zustand store and AsyncStorage
      await loginStore(response.user, response.token);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  /**
   * Logout mutation
   */
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: async () => {
      // Clear Zustand store and AsyncStorage
      await logoutStore();
      
      // Clear all queries
      queryClient.clear();
      
      // Navigate to login
      router.replace('/(auth)/login');
    },
  });

  /**
   * Get current user query
   */
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['user'],
    queryFn: () => authService.getCurrentUser(),
    enabled: !!useAuthStore.getState().token,
  });

  return {
    // Login
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    // Register
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,

    // Logout
    logout: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,

    // User
    user,
    isLoadingUser,
  };
}
