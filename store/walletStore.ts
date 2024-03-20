import { makeAutoObservable } from 'mobx';
import { ethers } from 'ethers';

/**
 * Represents a store for managing the wallet.
 */
class WalletStore {
  wallet: ethers.Wallet | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  /**
   * Sets the wallet for the store.
   * @param wallet - The wallet to be set.
   */
  setWallet(wallet: ethers.Wallet) {
    this.wallet = wallet;
  }
}

export const walletStore = new WalletStore();
