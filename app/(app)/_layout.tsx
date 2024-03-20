import React from 'react';
import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="polygon" options={{ headerShown: false }} />
      <Stack.Screen name="bitcoin" options={{ headerShown: false }} />
    </Stack>
  );
}
