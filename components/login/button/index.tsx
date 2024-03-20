import {
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import { custom } from '@/constants/Colors';

interface ButtonProps extends React.ComponentProps<typeof Pressable> {
  varient?: 'primary' | 'border';
  children: React.ReactNode;
}

const Button = ({ varient, children, ...btnProps }: ButtonProps) => {
  const setVarient = (varient: string) => {
    if (varient === 'border') {
      return {
        bg: styles.buttomBorder,
        text: styles.textBorder,
      };
    }
    return {
      bg: styles.button,
      text: styles.text,
    };
  };

  return (
    <Pressable style={setVarient(varient ?? 'primary').bg} {...btnProps}>
      <Text style={setVarient(varient ?? 'primary').text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 1000,
    elevation: 3,
    backgroundColor: custom.primaryGreen,
  },
  buttomBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 1000,
    elevation: 3,
    backgroundColor: 'transparent',
    borderColor: custom.primaryGreen,
    borderWidth: 1,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  textBorder: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: custom.primaryGreen,
  },
});

export default Button;
