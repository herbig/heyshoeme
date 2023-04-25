export const COLLECTION_ADDRESS = '0xbd05e413f7f581d7d2a7d8dadadfdebfb8f65b85';
export const COLLECTION_URL = `https://rarible.com/token/polygon/${COLLECTION_ADDRESS}:`;
export const CONTRACT_URL = `https://polygonscan.com/address/${COLLECTION_ADDRESS}#code`;
export const PAD_MD = 8;
export const PAD_SM = 4;
export const VERIFY_ABI = [
    {
      name: 'verify',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { internalType: 'string', name: '_username', type: 'string' },
        { internalType: 'string', name: '_description', type: 'string' },
        { internalType: 'string', name: '_image', type: 'string' }
      ],
      outputs: [],
    },
];
