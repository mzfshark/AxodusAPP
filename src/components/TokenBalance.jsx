// src/components/TokenBalance.jsx
import React from 'react';
import { useInvestment } from '../context/InvestmentContext';

const TokenBalance = () => {
  /** garante valor‑padrão caso o provider ainda não tenha carregado */
  const {
    tokenBalances = {},   // ← objeto vazio evita TypeError
    tokenList     = []    //  idem para lista de tokens
  } = useInvestment() ?? {};

  /* loading */
  if (!Object.keys(tokenBalances).length) {
    return <p>Loading balances…</p>;
  }

  return (
    <section>
      <h2>Your Token Balances</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tokenList.map(({ address, symbol, decimals }) => {
          const raw = tokenBalances[address] ?? '0';
          // formata usando Intl ou ethers.utils.formatUnits se precisar
          const balance = Number(raw).toLocaleString(undefined, {
            maximumFractionDigits: 4
          });

          return (
            <li key={address}>
              {symbol} — {balance}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default TokenBalance;
