import * as SecureStore from 'expo-secure-store';

async function getPrivateKey(key: string) {
  try {
    const privateKey = await SecureStore.getItemAsync(key);
    return privateKey;
  } catch (error) {
    console.error('Error retrieving the private key', error);
  }
}

export default getPrivateKey;
