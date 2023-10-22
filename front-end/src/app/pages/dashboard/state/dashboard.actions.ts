import { createAction, props } from '@ngrx/store';
import { Product } from '../../../interfaces/product.interface';

export const loadProducts = createAction('[Dashboard] Load products');

export const loadProductsSuccess = createAction(
  '[Dashboard] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Dashboard] Load Products Failure',
  props<{ error: string }>()
);

export const removeProduct = createAction(
  '[Dashboard] Remove Product',
  props<{
    productId: string;
  }>()
);

export const removeProductSuccess = createAction(
  '[Dashboard] Remove Product Success'
);

export const removeProductFailure = createAction(
  '[Dashboard] Remove Product Failure',
  props<{ error: string }>()
);

export const updateProduct = createAction(
  '[Dashboard] Update Product',
  props<{
    updatedProduct: Product;
  }>()
);

export const updateProductSuccess = createAction(
  '[Dashboard] Update Product Success'
);

export const updateProductFailure = createAction(
  '[Dashboard] Update Product Failure',
  props<{ error: string }>()
);

export const setCurrentProduct = createAction(
  '[Dashboard] Set Current Product',
  props<{ currentProduct: Product }>()
);
