// src/services/blockchainService.js
import { Contract } from 'ethers';

const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
];

export const fetchTokenBalance = async (provider, tokenAddress, userAddress) => {
  const contract = new Contract(tokenAddress, ERC20_ABI, provider);
  const balance = await contract.balanceOf(userAddress);
  const decimals = await contract.decimals();
  return Number(balance) / 10 ** decimals;
};

