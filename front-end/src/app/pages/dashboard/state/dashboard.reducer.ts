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

export const getProducts = createSelector(getDashboardState, (state) => {
  const sortedProducts = [...state.products].sort((a, b) =>
    a.name && b.name ? a.name.localeCompare(b.name) : 0
  );
  return sortedProducts;
});

export const getStatus = createSelector(
  getDashboardState,
  (state) => state.status
);

export const getAPIStatus = createSelector(
  getDashboardState,
  (state) => state.apiConnected
);

export const getCurrentProductId = createSelector(
  getDashboardState,
  (state) => state.currentProduct?.id
);

export const getCurrentProduct = createSelector(
  getDashboardState,
  getCurrentProductId,
  (state, currentProductId) => {
    let cProduct: Product;
    if (currentProductId === 0) {
      cProduct = {
        id: 0,
        name: '',
        description: '',
        image: '',
        price: 0,
        category: '',
        quantity: 0,
        inventoryStatus: '',
        rating: 0,
      };
      return cProduct;
    } else {
      return state.products?.find(
        (p: Product) => p.id === currentProductId
      ) as Product;
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
    AppActions.ConnectAPIActions.connectAPI,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),
  on(
    AppActions.ConnectAPIActions.connectAPISuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
      apiConnected: true,
    })
  ),
  on(
    AppActions.ConnectAPIActions.connectAPIFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
      apiConnected: false,
    })
  ),
  on(
    AppActions.LoadProductActions.loadProducts,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.LoadProductActions.loadProductsSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
      products: action.products,
    })
  ),

  on(
    AppActions.LoadProductActions.loadProductsFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.ProductActions.addProduct,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ProductActions.addProductSuccess,
    (state, action): DashboardState => ({
      ...state,
      status: 'success',
      products: [...state.products, action.newProduct],
    })
  ),

  on(
    AppActions.ProductActions.addProductFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),
  on(
    AppActions.ProductActions.removeProduct,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ProductActions.removeProductSuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.ProductActions.removeProductFailure,
    (state, action): DashboardState => ({
      ...state,
      error: action.error,
      status: 'error',
    })
  ),

  on(
    AppActions.ProductActions.updateProduct,
    (state): DashboardState => ({
      ...state,
      status: 'loading',
    })
  ),

  on(
    AppActions.ProductActions.updateProductSuccess,
    (state): DashboardState => ({
      ...state,
      status: 'success',
    })
  ),

  on(
    AppActions.ProductActions.updateProductFailure,
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
  ),

  on(
    AppActions.clearCurrentProduct,
    (state): DashboardState => ({
      ...state,
      currentProduct: null,
    })
  )
);
