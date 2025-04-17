import { useState, useEffect, useCallback } from 'react';
import { PublicKey, Transaction } from '@solana/web3.js';

interface IframeWalletState {
  publicKey: PublicKey | null;
  connected: boolean;
  hasSignTransaction: boolean;
  hasSignAllTransactions: boolean;
}

export function useIframeWallet() {
  const [walletState, setWalletState] = useState<IframeWalletState>({
    publicKey: null,
    connected: false,
    hasSignTransaction: false,
    hasSignAllTransactions: false
  });

  const requestWalletInfo = useCallback(() => {
    window.parent.postMessage({ type: 'WALLET_REQUEST' }, window.location.origin);
  }, []);

  const signTransaction = useCallback(async (transaction: Transaction): Promise<Transaction> => {
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'SIGN_TRANSACTION_RESPONSE') {
          window.removeEventListener('message', handleMessage);
          const signedTx = Transaction.from(Buffer.from(event.data.data.signedTransaction, 'base64'));
          resolve(signedTx);
        } else if (event.data.type === 'SIGN_TRANSACTION_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.data.error));
        }
      };

      window.addEventListener('message', handleMessage);
      window.parent.postMessage({
        type: 'SIGN_TRANSACTION',
        data: {
          transaction: transaction.serialize().toString('base64')
        }
      }, window.location.origin);
    });
  }, []);

  const signAllTransactions = useCallback(async (transactions: Transaction[]): Promise<Transaction[]> => {
    return new Promise((resolve, reject) => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === 'SIGN_ALL_TRANSACTIONS_RESPONSE') {
          window.removeEventListener('message', handleMessage);
          const signedTxs = event.data.data.signedTransactions.map((tx: string) =>
            Transaction.from(Buffer.from(tx, 'base64'))
          );
          resolve(signedTxs);
        } else if (event.data.type === 'SIGN_ALL_TRANSACTIONS_ERROR') {
          window.removeEventListener('message', handleMessage);
          reject(new Error(event.data.data.error));
        }
      };

      window.addEventListener('message', handleMessage);
      window.parent.postMessage({
        type: 'SIGN_ALL_TRANSACTIONS',
        data: {
          transactions: transactions.map(tx => tx.serialize().toString('base64'))
        }
      }, window.location.origin);
    });
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'WALLET_RESPONSE') {
        const { publicKey, connected, hasSignTransaction, hasSignAllTransactions } = event.data.data;
        setWalletState({
          publicKey: publicKey ? new PublicKey(publicKey) : null,
          connected,
          hasSignTransaction,
          hasSignAllTransactions
        });
      }
    };

    // Request wallet info immediately
    requestWalletInfo();

    // Set up interval to periodically check wallet status
    const interval = setInterval(requestWalletInfo, 5000);

    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(interval);
    };
  }, [requestWalletInfo]);

  return {
    ...walletState,
    signTransaction,
    signAllTransactions
  };
} 