export default interface FormattedData {
  name: string;
  symbol: string;
  priceInUSD: string;
  totalLiquidityUSD: string;
  availableLiquidityUSD: string;
  totalDebtUSD: string;
  borrowUsageRatio: string;
  formattedBaseLTVasCollateral: string;
  formattedReserveLiquidationThreshold: string;
  formattedReserveLiquidationBonus: string;
  supplyAPY: string;
  variableBorrowAPY: string;
  borrowCapUSD: string;
  supplyCapUSD: string;
  supplyUsageRatio: string;
  supplyAPR: string;
  variableBorrowAPR: string;
  isFrozen: boolean;
  isActive: boolean;
  unbackedUSD: string;
  accruedToTreasury: string;
}