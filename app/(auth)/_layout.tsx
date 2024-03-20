import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const Login = () => {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="importWallet/[token]"
        options={{ title: 'Import Wallet' }}
      />
    </Stack>
  );
};

export default Login;
