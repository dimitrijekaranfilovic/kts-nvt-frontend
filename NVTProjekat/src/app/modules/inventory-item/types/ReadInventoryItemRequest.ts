export interface ReadInventoryItemRequest {
  query?: string;
  basePriceLowerBound?: number;
  basePriceUpperBound?: number;
  category?: string;
}
