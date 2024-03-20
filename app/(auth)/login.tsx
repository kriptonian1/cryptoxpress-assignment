import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import Container from '@/components/shared/container';
import { black, custom, white } from '@/constants/Colors';
import HeroSVG from '@/assets/svg/heroSVG';
import Button from '@/components/login/button';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import PolygonSVG24 from '@/assets/svg/icons/28/polygonSVG_28';
import BitcoinSVG24 from '@/assets/svg/icons/28/bitcoinSVG_28';
import { Link } from 'expo-router';

const Login = () => {
  const [isSheeetOpen, setIsSheeetOpen] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
    if (index >= 0) {
      setIsSheeetOpen(true);
    } else {
      setIsSheeetOpen(false);
    }
  }, []);

  const snapPoints = [150];
  return (
    <Container>
      <View style={styles.heroSvg}>
        <HeroSVG />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Only Wallet You Need</Text>
        <Text style={styles.subHeadingText}>
          The most user friendly, non-custodian blockchain agnostic wallet
        </Text>
      </View>
      <Button
        onPress={() => {
          handleSnapPress(0);
        }}
      >
        {' '}
        Import wallet{' '}
      </Button>

      <View style={styles.container}>
        <BottomSheet
          index={-1}
          ref={bottomSheetRef}
          onClose={() => setIsSheeetOpen(false)}
          backgroundStyle={{
            backgroundColor: custom.backgroundLight,
          }}
          handleIndicatorStyle={{
            backgroundColor: custom.secondaryText,
          }}
          containerStyle={{
            backgroundColor: isSheeetOpen
              ? 'rgba(0, 0, 0, 0.43)'
              : 'transparent',
          }}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  gap: 10,
                }}
              >
                <PolygonSVG24 />
                <Text style={[styles.text, styles.walletText]}>
                  Polygon wallet
                </Text>
              </View>

              <View>
                <Link
                  style={{
                    backgroundColor: custom.primaryGreen,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                  href={{
                    pathname: '/(auth)/importWallet/[token]',
                    params: { token: 'polygon' },
                  }}
                >
                  <Text
                    style={{
                      color: black,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Import
                  </Text>
                </Link>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                  gap: 10,
                }}
              >
                <BitcoinSVG24 />
                <Text style={[styles.text, styles.walletText]}>
                  Bitcoin wallet
                </Text>
              </View>
              <View>
                <Link
                  style={{
                    backgroundColor: custom.primaryGreen,
                    paddingVertical: 2,
                    paddingHorizontal: 10,
                    borderRadius: 5,
                  }}
                  href={{
                    pathname: '/(auth)/importWallet/[token]',
                    params: { token: 'bitcoin' },
                  }}
                >
                  <Text
                    style={{
                      color: black,
                      fontSize: 16,
                      fontWeight: '600',
                    }}
                  >
                    Import
                  </Text>
                </Link>
              </View>
            </View>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  heroSvg: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 80,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    rowGap: 18,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: white,
  },
  subHeadingText: {
    fontSize: 16,
    color: custom.secondaryText,
    textAlign: 'center',
  },
  text: {
    color: white,
  },
  walletText: {
    fontSize: 15,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Login;
