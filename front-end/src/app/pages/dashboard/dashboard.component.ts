import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import * as AppActions from 'src/app/pages/dashboard/state/dashboard.actions';
import {
  getAPIStatus,
  getProducts,
  getStatus,
} from 'src/app/pages/dashboard/state/dashboard.reducer';
import { DashboardState } from 'src/app/pages/dashboard/state/dashboard.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt') productsTable!: Table;

  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  productsStatuses!: any[];

  // To get API Status without NgRx
  // apiState: boolean = false;
  // apiState$?: Observable<boolean>;
  // apiStateSubscription?: Subscription;

  // region NGRX Selectors

  productos$!: Observable<Product[]>;
  status$!: Observable<'success' | 'pending' | 'error' | 'loading'>;
  apiStatus$!: Observable<boolean>;

  // endregion

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store<DashboardState> // private productService: ProductService
  ) {}

  async ngOnInit() {
    this.productos$ = this.store.select(getProducts);
    this.status$ = this.store.select(getStatus);
    this.apiStatus$ = this.store.select(getAPIStatus);

    this.store.dispatch(AppActions.ConnectAPIActions.connectAPI());
    this.store.dispatch(AppActions.LoadProductActions.loadProducts());

    this.productsStatuses = [
      { label: 'EN STOCK', value: 'EN STOCK' },
      { label: 'STOCK BAJO', value: 'STOCK BAJO' },
      { label: 'SIN STOCK', value: 'SIN STOCK' },
    ];
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };

    this.store.dispatch(
      AppActions.setCurrentProduct({ currentProduct: product })
    );

    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Esta seguro que desea eliminar ' + product.name + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (product.id) {
          this.store.dispatch(
            AppActions.ProductActions.removeProduct({ productId: product.id })
          );
        }
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.store.dispatch(AppActions.clearCurrentProduct());
  }

  saveProduct() {
    this.submitted = true;

    if (this.product && this.product.name?.trim()) {
      if (this.product.id) {
        this.store.dispatch(
          AppActions.ProductActions.updateProduct({
            updatedProduct: this.product,
          })
        );
      } else {
        this.product.rating = 0;
        this.product.image = 'product-placeholder.svg';
        this.store.dispatch(
          AppActions.ProductActions.addProduct({ newProduct: this.product })
        );
      }

      this.productDialog = false;
      this.store.dispatch(AppActions.clearCurrentProduct());
      this.product = {};
    }
  }

  getSeverity(status: string) {
    switch (status) {
      case 'EN STOCK':
        return 'success';
      case 'STOCK BAJO':
        return 'warning';
      case 'SIN STOCK':
        return 'danger';
      default:
        return '';
    }
  }

  onSearchInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.productsTable.filterGlobal(target.value, 'contains');
  }
}
