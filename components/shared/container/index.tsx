import { custom } from '@/constants/Colors';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

interface ContainerProps {
  children: React.ReactNode;
}

function Container({ children }: ContainerProps) {
  return (
    <SafeAreaView>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: custom.background,
    padding: 28,
  },
});

export default Container;
