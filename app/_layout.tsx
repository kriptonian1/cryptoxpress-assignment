import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Redirect, Stack, router, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

import { useColorScheme } from '@/components/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useObserver } from 'mobx-react';
import { walletStore } from '@/store/walletStore';
import { getPrivateKey } from '@/utils';
// import * as SecureStore from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  // async function getPrivateKey(key: string) {
  //     try {
  //         const privateKey = await SecureStore.getItemAsync(key);
  //         return privateKey;
  //     } catch (error) {
  //         console.error("Error retrieving the private key", error);
  //     }
  // }

  // useEffect(() => {
  //     false ? router.replace("/(app)/home") : router.replace("/(auth)/login");
  // }, []);

  useEffect(() => {
    const fetchPrivateKey = async () => {
      const privateKey = await getPrivateKey('polyPvtKey');
      console.log('privateKey', privateKey);

      if (privateKey) {
        router.replace('/(app)/home');
      } else {
        router.replace('/(auth)/login');
      }
    };

    fetchPrivateKey();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
