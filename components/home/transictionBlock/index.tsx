import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Transaction } from '@/types';
import { convertWeiToEth, formatAddress } from '@/utils';
import { custom, red, white } from '@/constants/Colors';
const _handlePressButtonAsync = async (tranxHash: string) => {
  await WebBrowser.openBrowserAsync(
    `https://sepolia.etherscan.io/tx/${tranxHash}`
  );
};

interface TransactionBlockProps {
  transaction: Transaction;
}

const TransactionBlock = ({ transaction }: TransactionBlockProps) => {
  return (
    <TouchableOpacity
      onPress={() => _handlePressButtonAsync(transaction.hash)}
      style={styles.transictionBlock}
    >
      <View style={{ flexDirection: 'column' }}>
        <Text style={styles.textColor}>
          From: {formatAddress(transaction.from)}
        </Text>
        <Text style={styles.textColor}>
          Value: {convertWeiToEth(transaction.value)} ETH
        </Text>
      </View>
      <Text
        style={{
          color: transaction.isError === '0' ? custom.primaryGreen : red[200],
          textAlign: 'right',
        }}
      >
        {transaction.isError === '0' ? 'Success' : 'Failed'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: white,
  },
  transictionBlock: {
    // backgroundColor: custom.primaryGreen50,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: custom.primaryGreen,
  },
});

export default TransactionBlock;
