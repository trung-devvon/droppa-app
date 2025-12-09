import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerBackTitle: '',
        headerTintColor: '#FF6200',
        contentStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ title: 'Settings' }} 
      />
    </Stack>
  );
}
