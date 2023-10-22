import { Product } from '../../../interfaces/product.interface';

export interface DashboardState {
  products: Product[];
  status: 'success' | 'pending' | 'error' | 'loading';
  error: string | null;
  currentProduct: Product | null;
}

export const initialState: DashboardState = {
  products: [],
  status: 'pending',
  error: null,
  currentProduct: null,
};
