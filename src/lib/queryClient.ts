import { QueryClient } from '@tanstack/react-query';

/**
 * TanStack Query Client configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cache time: 5 minutes
      gcTime: 1000 * 60 * 5,
      
      // Stale time: 1 minute (data considered fresh for 1 min)
      staleTime: 1000 * 60,
      
      // Retry failed requests 2 times
      retry: 2,
      
      // Retry delay: exponential backoff
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      
      // Refetch on window focus (useful for web, less for mobile)
      refetchOnWindowFocus: false,
      
      // Refetch on reconnect
      refetchOnReconnect: true,
      
      // Refetch on mount if data is stale
      refetchOnMount: true,
    },
    mutations: {
      // Retry mutations 1 time
      retry: 1,
      
      // Retry delay
      retryDelay: 1000,
    },
  },
});
