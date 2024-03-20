import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import Container from '@/components/shared/container';
import Button from '@/components/login/button';
import { custom, white } from '@/constants/Colors';
import { ethers } from 'ethers';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react';
import { walletStore } from '@/store/walletStore';
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams } from 'expo-router';
// import bip39 from 'bip39';
// import * as bitcoin from 'bitcoinjs-lib';
// import * as ecc from 'tiny-secp256k1';
// import BIP32Factory from "bip32";

// const bip32 = BIP32Factory(ecc);

const ImportWallet = observer(() => {
  const [privateKey, setPrivateKey] = useState<string>('');
  const router = useRouter();

  const local = useLocalSearchParams();

  const token =
    local['token'].toString().charAt(0).toUpperCase() + local['token'].slice(1);

  console.log('Token:', token);

  async function storePrivateKey(key: string, privateKey: string) {
    if (privateKey.length === 0) {
      ToastAndroid.show('Please enter private key', ToastAndroid.SHORT);
      return;
    }

    try {
      if (token === 'Polygon') {
        const wallet: ethers.Wallet = new ethers.Wallet(privateKey);
        walletStore.setWallet(wallet);
        console.log('Wallet Address:', wallet.address);
      }
      // else{
      //     const mnemonic = privateKey;
      //     const seed = bip39.mnemonicToSeedSync(mnemonic);
      //     const root = bip32.fromSeed(seed);
      //     const child = root.derivePath("m/44'/0'/0'/0/0");
      //     const address = bitcoin.payments.p2pkh({ pubkey: child.publicKey }).address;
      //     console.log("Bitcoin Address:", address);

      // }
      else {
        ToastAndroid.show(
          'Having some issues with bitcoin wallet',
          ToastAndroid.SHORT
        );
        return;
      }

      await SecureStore.setItemAsync(key, privateKey);

      ToastAndroid.show('Your are all set to go', ToastAndroid.SHORT);
      if (token === 'Polygon') {
        router.replace('/(app)/polygon');
      } else {
        router.replace('/(app)/bitcoin');
      }
    } catch (error) {
      ToastAndroid.show('Enter valid private key', ToastAndroid.SHORT);
      console.error('Error storing the private key', error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Container>
        <View style={styles.containerElement}>
          <View style={styles.textContainer}>
            <Text style={styles.headingText}>Import {token} Wallet</Text>
            <Text style={styles.subHeadingText}>
              {token === 'Polygon'
                ? 'Enter your private key to import your Polygon wallet'
                : 'Enter your mnemonic to import your Bitcoin wallet'}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputfield}
              placeholder="Enter your private key here"
              placeholderTextColor="#808080"
              cursorColor={custom.primaryGreen}
              inputMode="text"
              onChangeText={(text) => setPrivateKey(text)}
            />
          </View>
        </View>

        <Button
          onPress={() =>
            storePrivateKey(
              token === 'Polygon' ? 'polyPvtKey' : 'btcPvtKey',
              privateKey
            )
          }
        >
          Import {token} wallet
        </Button>
      </Container>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  textContainer: {
    flex: 2,
    alignItems: 'center',
    rowGap: 18,
    marginTop: 100,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
  },
  subHeadingText: {
    fontSize: 16,
    fontWeight: '600',
    width: '80%',
    color: custom.secondaryText,
    textAlign: 'center',
  },
  text: {
    color: white,
  },
  inputfield: {
    backgroundColor: custom.inputBackground,
    textAlignVertical: 'top',
    width: '80%',
    height: 137,
    borderRadius: 10,
    padding: 10,
    color: white,
  },
  inputContainer: {
    flex: 5,
    alignItems: 'center',
    width: '100%',
    height: 500,
  },
  containerElement: {
    flex: 1,
    gap: 20,
  },
});

export default ImportWallet;
