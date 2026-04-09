// src/api/userData.jsx

// Simula dados on-chain de investimentos do usuário
export async function getUserInvestments(address) {
    console.log(`Fetching user investments for: ${address}`);
  
    // Simulação: delay artificial
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    return [
      {
        productId: "eth-staking",
        name: "Ethereum Staking",
        chain: "Ethereum",
        valueUSD: 12300.5,
        roi: 4.25,
        icon: "/assets/icons/eth.svg",
      },
      {
        productId: "btc-mining",
        name: "Bitcoin Mining",
        chain: "Bitcoin",
        valueUSD: 8450.0,
        roi: 6.7,
        icon: "/assets/icons/btc.svg",
      },
      {
        productId: "polygon-bot",
        name: "Polygon Trading Bot",
        chain: "Polygon",
        valueUSD: 4200.0,
        roi: -1.3,
        icon: "/assets/icons/matic.svg",
      },
    ];
  }
  
  // Mock para gráfico de performance histórica
  export async function getUserPerformance(address) {
    await new Promise((resolve) => setTimeout(resolve, 300));
  
    return [
      { name: 'Jan', value: 700 },
      { name: 'Feb', value: 1100 },
      { name: 'Mar', value: 1500 },
      { name: 'Apr', value: 1250 },
      { name: 'May', value: 1800 },
      { name: 'Jun', value: 1600 },
      { name: 'Jul', value: 2100 },
    ];
  }
  