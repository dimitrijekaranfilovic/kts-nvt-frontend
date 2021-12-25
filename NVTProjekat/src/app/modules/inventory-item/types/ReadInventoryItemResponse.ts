export interface ReadInventoryItemResponse {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  allergies: string;
  category: string;
  isInMenu: boolean;
  image: string;
}
