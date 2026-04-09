// src/context/InvestmentContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useAppKit } from '@reown/appkit/react';               // ← CORRIGIDO
import { fetchTokenBalance } from '../services/blockchainService';

const InvestmentContext = createContext();

export const useInvestment = () => useContext(InvestmentContext);

export const InvestmentProvider = ({ children }) => {
  const { appKit, isReady } = useAppKit();
  const [tokenBalances, setTokenBalances] = useState({});
  const [chainId, setChainId] = useState(null);
  const [tokenList, setTokenList] = useState([]);

  useEffect(() => {
    const fetchBalances = async () => {
      if (!isReady) return;

      try {
        let signer;

        if (appKit?.getSigner) {
          signer = await appKit.getSigner();
        } else if (window.ethereum) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
        } else {
          console.error('Ethereum provider not found');
          return;
        }

        const account = await signer.getAddress();
        const network = await signer.provider.getNetwork();
        const currentChainId = Number(network.chainId);

        setChainId(currentChainId);

        // Load token list for current chain
        const tokenListModule = await import(`../assets/tokenlist/${currentChainId}.json`);
        const tokens = tokenListModule.default;
        setTokenList(tokens);

        const balances = {};
        for (const token of tokens) {
          const balance = await fetchTokenBalance(signer.provider, token.address, account);
          balances[token.symbol] = balance;
        }

        setTokenBalances(balances);
      } catch (error) {
        console.error('Erro ao buscar balances:', error);
      }
    };

    fetchBalances();
  }, [appKit, isReady]);

  return (
    <InvestmentContext.Provider value={{ tokenBalances, tokenList, chainId }}>
      {children}
    </InvestmentContext.Provider>
  );
};
