// src/api/protocolData.jsx

/* import { ethers } from "ethers";
# import InvestmentProductRegistryABI from "../abi/InvestmentProductRegistry.json";
#
#// exemplo de endereço do contrato
#const registryAddress = "0x1234567890abcdef...";
#
#const provider = new ethers.JsonRpcProvider(import.meta.env.VITE_RPC_ETH);
#
#export async function getOverviewStats() {
  const contract = new ethers.Contract(
    registryAddress,
    InvestmentProductRegistryABI,
    provider
  );

  const [totalUsers, totalProducts, protocolFee, tvl, rawProducts] =
    await Promise.all([
      contract.totalInvestors(),
      contract.totalProducts(),
      contract.protocolFee(),
      contract.totalValueLocked(),
      contract.getAllProducts()
    ]);

  const products = rawProducts.map((p) => ({
    address: p.addr,
    name: p.name,
    type: p.productType,
    chain: p.chain,
    roi: Number(p.roi) // simulando
  }));

  return {
    totalUsers: Number(totalUsers),
    totalProducts: Number(totalProducts),
    protocolFee: Number(protocolFee) / 100,
    totalValueLocked: Number(tvl) / 1e18,
    products
  };
} */

  // src/api/protocolData.jsx (mockado)

export async function getOverviewStats() {
  // Simula delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    totalUsers: 842,
    totalProducts: 5,
    protocolFee: 35264.046, // em usd
    protocolApr: 16.38, // %
    totalValueLocked: 276320.23, // em USD

    products: [
      {
        address: "0x111...aaa",
        name: "ETH Staking Pool",
        type: "Staking PoS",
        chain: "Ethereum",
        roi: 4.8,
      },
      {
        address: "0x222...bbb",
        name: "Polygon AI Bot",
        type: "Trading Bot",
        chain: "Polygon",
        roi: 8.3,
      },
      {
        address: "0x333...ccc",
        name: "BTC Mining Pool",
        type: "Mining PoW",
        chain: "Bitcoin",
        roi: 5.1,
      },
      {
        address: "0x444...ddd",
        name: "VC Launch Fund",
        type: "Venture Capital",
        chain: "Ethereum",
        roi: 21.7,
      },
      {
        address: "0x555...eee",
        name: "TRON Stable Yield",
        type: "Fixed Income",
        chain: "Tron",
        roi: 9.2,
      },
    ],
  };
}
