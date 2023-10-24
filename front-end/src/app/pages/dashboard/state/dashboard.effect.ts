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

  /** An effect that listens for the connectAPI action and connects to the API using the ProductService.
   * If the connection is successful, it dispatches the connectAPISuccess action with the token.
   * If there is an error, it dispatches the connectAPIFailure action with the error.
   */
  connectAPI$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.connectAPI),
      switchMap(() =>
        this._productService.doAuthenticate().pipe(
          map((data: string) => AppActions.connectAPISuccess({ token: data })),
          catchError((error) => of(AppActions.connectAPIFailure({ error })))
        )
      )
    );
  });

  /** Effect that triggers when the connectAPISuccess action is dispatched.
   * Shows a success alert and sets the token in the ProductService.
   * @returns An observable of the action to show the success alert.
   */
  connectAPISuccess$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.connectAPISuccess),
      switchMap((action) =>
        of(
          ShowAlert({
            severity: 'success',
            summary: 'API PRODUCTOS',
            detail: 'Conexión establecida',
            life: 3000,
          })
        ).pipe(
          tap(() => {
            this._productService.setToken(action.token);
          })
        )
      )
    );
  });

  /** Effect that listens for the connectAPIFailure action and shows an error alert if triggered.
   * @returns An observable of the ShowAlert action.
   */
  connectAPIFailure$ = createEffect(() => {
    return this.action$.pipe(
      ofType(AppActions.connectAPIFailure),
      switchMap(() =>
        of(
          ShowAlert({
            severity: 'error',
            summary: 'API PRODUCTOS',
            detail: 'Sin Conexión',
            life: 3000,
          })
        )
      )
    );
  });

  /** An effect that loads products from the API and dispatches actions based on the result.
   * @returns An observable of actions.
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

  /** An effect that adds a new product to the store.
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

  /** Effect that triggers when a product is successfully added.
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
        )
      )
    );
  });

  /** Effect that removes a product from the database.
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

  /** An effect that triggers when a product is successfully removed.
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

  /** An effect that listens for the updateProduct action and updates the product using the ProductService.
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

  /**  An effect that listens for the updateProductSuccess action and triggers the loadProducts action.
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
