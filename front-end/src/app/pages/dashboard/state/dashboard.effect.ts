import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as AppActions from './dashboard.actions';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product.interface';
import { ShowAlert } from 'src/app/components/state/message.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private action$: Actions,
    private _productService: ProductService
  ) {}

  /**
   * Effect that loads products from the server and dispatches success or failure actions accordingly.
   * @returns An observable of the success or failure action.
   */
  loadProducts$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.loadProducts),
      switchMap(() =>
        this._productService.getProductsAPI().pipe(
          map((dbProducts: Product[]) =>
            AppActions.loadProductsSuccess({ products: dbProducts })
          ),
          catchError((error) => of(AppActions.loadProductsFailure({ error })))
        )
      )
    );
  });

  /**
   * An effect that adds a new product to the store.
   * @returns An observable of the action to dispatch.
   */
  addProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.addProduct),
      switchMap((action) =>
        this._productService.addProductAPI(action.newProduct).pipe(
          map((product) =>
            AppActions.addProductSuccess({ newProduct: product })
          ),
          catchError((error) => of(AppActions.addProductFailure({ error })))
        )
      )
    );
  });

  /**
   * Effect that triggers when a product is successfully added.
   * Shows a success alert and dispatches an action to load the products.
   * @returns An observable of the action to show the success alert.
   */
  addProductSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.addProductSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Hecho',
            detail: 'Producto Añadido',
            life: 3000,
          })
          // ,
          // AppActions.loadProducts()
        )
      )
    );
  });

  /**
   * Effect that removes a product from the database.
   * @returns An observable of the removeProductSuccess action or the removeProductFailure action if an error occurs.
   */
  removeProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.removeProduct),
      switchMap((action) =>
        this._productService.deleteProductAPI(action.productId).pipe(
          map(() => AppActions.removeProductSuccess()),
          catchError((error) => of(AppActions.removeProductFailure({ error })))
        )
      )
    );
  });

  /**
   * An effect that triggers when a product is successfully removed.
   * Dispatches an action to load all products.
   */
  removeProductSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.removeProductSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Hecho',
            detail: 'Producto Eliminado',
            life: 3000,
          }),

          AppActions.loadProducts()
        )
      )
    );
  });

  /**
   * An effect that listens for the updateProduct action and updates the product using the ProductService.
   * If the update is successful, it dispatches the updateProductSuccess action.
   * If there is an error, it dispatches the removeProductFailure action with the error.
   */
  updateProduct$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.updateProduct),
      switchMap((action) =>
        this._productService.updateProductAPI(action.updatedProduct).pipe(
          map((updatedProduct) =>
            AppActions.updateProductSuccess({
              updatedProduct: updatedProduct,
            })
          ),
          catchError((error) => of(AppActions.removeProductFailure({ error })))
        )
      )
    );
  });

  /**
   * An effect that listens for the updateProductSuccess action and triggers the loadProducts action.
   * @returns An Observable of loadProducts action.
   */
  updateProductSuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.updateProductSuccess),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'Hecho',
            detail: 'Producto Actualizado',
            life: 3000,
          }),

          AppActions.loadProducts()
        )
      )
    );
  });
}
