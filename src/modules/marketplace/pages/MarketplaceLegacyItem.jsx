import { Navigate, useParams } from 'react-router-dom';
import MarketplacePageHeader from '../components/MarketplacePageHeader';
import { getMarketplaceProductByItemRef } from '../services/marketplaceService';

export default function MarketplaceLegacyItem() {
  const { chain, contract, id } = useParams();
  const product = getMarketplaceProductByItemRef(chain, contract, id);
  if (!product) {
    return <main className="app-view-shell"><MarketplacePageHeader title="NFT item not found" description="The legacy NFT reference is not registered in Marketplace mock data." /></main>;
  }
  return <Navigate to={`/marketplace/products/${product.slug}`} replace />;
}
