import { FC, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Transaction } from '@solana/web3.js';

// Список разрешенных доменов для iframe
const ALLOWED_ORIGINS = [
  'http://localhost:8080',
  'https://www.cryowar.com',
  // Добавьте другие домены, которым вы доверяете
];

export const WalletIframeProvider: FC = () => {
  const { publicKey, connected, signTransaction, signAllTransactions } = useWallet();

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      // Проверяем, что домен в списке разрешенных
      if (!ALLOWED_ORIGINS.includes(event.origin)) return;

      const { type, data } = event.data;

      switch (type) {
        case 'WALLET_REQUEST':
          // Отправляем информацию о кошельке в iframe
          event.source?.postMessage({
            type: 'WALLET_RESPONSE',
            data: {
              publicKey: publicKey?.toString(),
              connected,
              hasSignTransaction: !!signTransaction,
              hasSignAllTransactions: !!signAllTransactions
            }
          }, { targetOrigin: event.origin });
          break;

        case 'SIGN_TRANSACTION':
          if (signTransaction && data?.transaction) {
            try {
              const transaction = Transaction.from(Buffer.from(data.transaction, 'base64'));
              const signed = await signTransaction(transaction);
              event.source?.postMessage({
                type: 'SIGN_TRANSACTION_RESPONSE',
                data: {
                  signedTransaction: signed.serialize().toString('base64')
                }
              }, { targetOrigin: event.origin });
            } catch (error: unknown) {
              event.source?.postMessage({
                type: 'SIGN_TRANSACTION_ERROR',
                data: { error: error instanceof Error ? error.message : 'Unknown error' }
              }, { targetOrigin: event.origin });
            }
          }
          break;

        case 'SIGN_ALL_TRANSACTIONS':
          if (signAllTransactions && data?.transactions) {
            try {
              const transactions = data.transactions.map((tx: string) => 
                Transaction.from(Buffer.from(tx, 'base64'))
              );
              const signed = await signAllTransactions(transactions);
              event.source?.postMessage({
                type: 'SIGN_ALL_TRANSACTIONS_RESPONSE',
                data: {
                  signedTransactions: signed.map(tx => tx.serialize().toString('base64'))
                }
              }, { targetOrigin: event.origin });
            } catch (error: unknown) {
              event.source?.postMessage({
                type: 'SIGN_ALL_TRANSACTIONS_ERROR',
                data: { error: error instanceof Error ? error.message : 'Unknown error' }
              }, { targetOrigin: event.origin });
            }
          }
          break;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [publicKey, connected, signTransaction, signAllTransactions]);

  return null;
}; 