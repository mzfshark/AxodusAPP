export const tokenVotingAbi = [
  {
    type: 'function',
    name: 'vote',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_proposalId', type: 'uint256' },
      { name: '_voteOption', type: 'uint8' },
      { name: '_tryEarlyExecution', type: 'bool' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'execute',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_proposalId', type: 'uint256' }],
    outputs: [],
  },
];

export const multisigAbi = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: '_proposalId', type: 'uint256' },
      { name: '_tryExecution', type: 'bool' },
    ],
    outputs: [],
  },
  {
    type: 'function',
    name: 'execute',
    stateMutability: 'nonpayable',
    inputs: [{ name: '_proposalId', type: 'uint256' }],
    outputs: [],
  },
];
