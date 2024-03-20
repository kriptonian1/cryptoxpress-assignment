import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  FlatList,
  Modal,
  TextInput,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { custom, white } from '@/constants/Colors';
import Container from '@/components/shared/container';
import { Observer } from 'mobx-react';
import { walletStore } from '@/store/walletStore';
import {
  formatAddress,
  formatBalance,
  getBalanceSepolia,
  getPrivateKey,
  sendTransaction,
} from '@/utils';
import { ethers } from 'ethers';
import getTransactionHistory from '@/utils/getTransictionHistory';
import { ApiResponse } from '@/types';
import Button from '@/components/login/button';
import TransactionBlock from '@/components/home/transictionBlock';

const Polygon = (): React.JSX.Element => {
  const [publicKey, setPublicKey] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [transactionHistory, setTransactionHistory] = useState<ApiResponse>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [senderKey, setSenderKey] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const getPublicAddress = async () => {
    if (walletStore.wallet !== null) {
      console.log('Wallet Address:', walletStore.wallet.address);

      return walletStore.wallet.address;
    } else {
      console.log('Wallet Address: Not found');

      getPrivateKey('polyPvtKey')
        .then((privateKey) => {
          const wallet: ethers.Wallet = new ethers.Wallet(privateKey as string);
          walletStore.setWallet(wallet);
          console.log('Wallet Address:', wallet.address);

          setPublicKey(wallet.address);
          return wallet.address;
        })
        .catch((error) => {
          console.error('Error retrieving the private key', error);
        });
    }
  };

  useEffect(() => {
    getPublicAddress().then((address) => {
      setPublicKey(address as string);
    });
    getBalanceSepolia(publicKey as string).then((balance) => {
      setBalance(balance);
    });
    getTransactionHistory(publicKey as string).then((history) => {
      setTransactionHistory(history);
    });
  }, [publicKey]);

  return (
    <Observer>
      {() => (
        <Container>
          <View>
            <View style={styles.addressContainer}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(publicKey as string); // ! add react-native-clipboard and a toast on copy
                  ToastAndroid.show('Address copied', ToastAndroid.SHORT);
                }}
                style={styles.addressBg}
              >
                {walletStore.wallet !== null ? (
                  <Text style={[styles.textColor]}>
                    Wallet Address:{' '}
                    {publicKey !== undefined && formatAddress(publicKey)}
                  </Text>
                ) : (
                  <Text style={[styles.textColor]}>
                    Wallet Address: Loading ...
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>
                {balance.length <= 0
                  ? 'Loading Balance ...'
                  : `${formatBalance(balance)} ETH`}
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              marginVertical: 20,
            }}
          >
            <Button onPress={() => setModalVisible(true)}> Send </Button>
          </View>

          <View>
            <Text style={styles.textColor}>Transaction History</Text>
            {Array.isArray(transactionHistory) ? (
              <FlatList
                data={transactionHistory}
                keyExtractor={(item) => item.hash}
                renderItem={({ item: transaction }) => (
                  <TransactionBlock transaction={transaction} />
                )}
              />
            ) : (
              <Text style={styles.textColor}>Loading ...</Text>
            )}
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}
            >
              <View
                style={{
                  width: '80%',
                  backgroundColor: custom.backgroundLight,
                  padding: 20,
                  borderRadius: 10,
                  elevation: 20,
                  alignItems: 'center',
                }}
              >
                <Text style={[styles.textColor]}>Send Transaction</Text>
                <TextInput
                  style={styles.inputfield}
                  placeholder="Enter your public key"
                  placeholderTextColor="#808080"
                  cursorColor={custom.primaryGreen}
                  inputMode="text"
                  onChangeText={(text) => setSenderKey(text)}
                />
                <TextInput
                  style={styles.inputfield}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#808080"
                  cursorColor={custom.primaryGreen}
                  inputMode="text"
                  onChangeText={(text) => setAmount(text)}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '80%',
                  }}
                >
                  <Button
                    onPress={() => {
                      setModalVisible(false);
                      sendTransaction(senderKey, amount);
                    }}
                  >
                    Send
                  </Button>
                  <Button
                    varient="border"
                    onPress={() => setModalVisible(false)}
                  >
                    Close
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </Container>
      )}
    </Observer>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: white,
  },
  addressBg: {
    padding: 5,
    backgroundColor: custom.primaryGreen50,
    borderRadius: 1000,
  },
  addressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  balanceText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: white,
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },

  inputfield: {
    backgroundColor: custom.inputBackground,
    // textAlignVertical: "top",
    width: '80%',
    // height: 137,
    borderRadius: 10,
    padding: 10,
    color: white,
    borderColor: '#808080',
    borderWidth: 1,
    marginVertical: 10,
  },
});

export default Polygon;
