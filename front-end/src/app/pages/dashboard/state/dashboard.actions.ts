import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Product } from '../../../interfaces/product.interface';

export const ConnectAPIActions = createActionGroup({
  source: 'API',
  events: {
    'Connect API': emptyProps(),

    'Connect API Success': props<{ token: string }>(),

    'Connect API Failure': props<{ error: string }>(),
  },
});

export const ProductActions = createActionGroup({
  source: 'Products',
  events: {
    'Add Product': props<{ newProduct: Product }>(),

    'Add Product Success': props<{ newProduct: Product }>(),

    'Add Product Failure': props<{ error: string }>(),

    'Remove Product': props<{ productId: number }>(),

    'Remove Product Success': emptyProps(),

    'Remove Product Failure': props<{ error: string }>(),

    'Update Product': props<{ updatedProduct: Product }>(),

    'Update Product Success': props<{ updatedProduct: Product }>(),

    'Update Product Failure': props<{ error: string }>(),
  },
});

export const LoadProductActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Load Products': emptyProps(),

    'Load Products Success': props<{ products: Product[] }>(),

    'Load Products Failure': props<{ error: string }>(),
  },
});

export const setCurrentProduct = createAction(
  '[Dashboard] Set Current Product',
  props<{ currentProduct: Product }>()
);

export const clearCurrentProduct = createAction(
  '[Dashboard] Clear Current Product'
);
