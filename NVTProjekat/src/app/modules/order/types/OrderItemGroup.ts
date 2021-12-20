import { OrderGroupItem } from './OrderGroupItem';

export interface OrderItemGroup {
  id: number;
  name: string;
  status: string;
  orderItems: OrderGroupItem[];
}
