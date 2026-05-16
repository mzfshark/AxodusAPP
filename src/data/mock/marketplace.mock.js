export const marketplaceMock = {
  summary: { listedProducts: 8, activeSellers: 4, pendingValidations: 3, completedPurchases: 26, availableCategories: ['Courses', 'Strategy Licenses', 'Templates', 'Reports', 'MCP Services', 'Business Services', 'DAO Plugins', 'NFT Licenses'] },
  products: [
    { id: 'market-item-001', title: 'Governance Launch Template', category: 'Templates', sellerId: 'market-seller-001', status: 'listed', price: '25 USDC mock', acceptedCurrencies: ['USDC'], licenseRequired: false, governanceValidated: true, deliveryType: 'download', description: 'Template pack for DAO launch planning.' },
    { id: 'market-item-002', title: 'Treasury Risk Report Pack', category: 'Reports', sellerId: 'market-seller-002', status: 'pending-validation', price: '40 USDC mock', acceptedCurrencies: ['USDC'], licenseRequired: false, governanceValidated: false, deliveryType: 'document', description: 'Mock report bundle for treasury review UI.' },
    { id: 'market-item-003', title: 'Academy Tutor License', category: 'NFT Licenses', sellerId: 'market-seller-003', status: 'listed', price: 'license flow disabled', acceptedCurrencies: ['USDC'], licenseRequired: true, governanceValidated: true, deliveryType: 'license', description: 'License metadata for gated tutor publishing.' },
    { id: 'market-item-004', title: 'MCP Governance Service', category: 'MCP Services', sellerId: 'market-seller-004', status: 'draft', price: 'quote required', acceptedCurrencies: ['USDC'], licenseRequired: true, governanceValidated: false, deliveryType: 'service', description: 'Governance automation service placeholder.' },
  ],
  sellers: [
    { id: 'market-seller-001', name: 'Axodus Templates', type: 'Internal', validationStatus: 'approved', productsListed: 2, rating: 4.9, governanceStatus: 'approved' },
    { id: 'market-seller-002', name: 'Risk Guild', type: 'Partner', validationStatus: 'pending', productsListed: 1, rating: 4.5, governanceStatus: 'under-review' },
    { id: 'market-seller-003', name: 'Academy Licenses', type: 'Internal', validationStatus: 'approved', productsListed: 3, rating: 4.8, governanceStatus: 'approved' },
    { id: 'market-seller-004', name: 'MCP Operators', type: 'Partner', validationStatus: 'draft', productsListed: 2, rating: 4.2, governanceStatus: 'pending' },
  ],
};
