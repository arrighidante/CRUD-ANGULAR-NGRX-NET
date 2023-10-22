/* eslint-disable arrow-body-style */
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppActions from './dashboard.actions';
import { DashboardState, initialState } from './dashboard.state';
import { Product } from '../../../interfaces/product.interface';

// With this, I'll get the App state
export const getDashboardState =
  createFeatureSelector<DashboardState>('dashboard-state');

//#region - - - - - - - - - SELECTORS

export const getProducts = createSelector(
  getDashboardState,
  (state) => state.products
);

export const getStatus = createSelector(
  getDashboardState,
  (state) => state.status
);

export const getCurrentProductId = createSelector(
  getDashboardState,
  (state) => state.currentProduct?.id
);

export const getCurrentProduct = createSelector(
  getDashboardState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === '0') {
      return {
        id: '',
        code: '',
        name: '',
        description: '',
        image: '',
        price: '',
        category: '',
        quantity: '',
        inventoryStatus: '',
        rating: '',
      };
    } else {
      return currentProductId
        ? (state.products?.find(
            (p: any) => p.id === currentProductId
          ) as Product)
        : null;
    }
  }
);

export const getError = createSelector(
  getDashboardState,
  (state) => state.error
);

//#endregion

export const dashboardReducer = createReducer<DashboardState>(
  initialState,

  on(
    AppActions.loadProducts,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.loadProductsSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
      products: action.products,
    })
  ),

  on(
    AppActions.loadProductsFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.removeProduct,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.removeProductSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.removeProductFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.updateProduct,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.updateProductSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.updateProductFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),
  on(
    AppActions.setCurrentProduct,
    (state, action): DashboardState => ({
      ...state,
      currentProduct: action.currentProduct,
    })
  )
);
