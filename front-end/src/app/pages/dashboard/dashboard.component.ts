import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, Subscription, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import {
  getProducts,
  getStatus,
} from 'src/app/pages/dashboard/state/dashboard.reducer';
import { DashboardState } from 'src/app/pages/dashboard/state/dashboard.state';
import * as AppActions from 'src/app/pages/dashboard/state/dashboard.actions';

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

  // We'll use this to show the API state (this is without NgRx)
  apiState: boolean = false;
  apiState$?: Observable<boolean>;
  apiStateSubscription?: Subscription;

  /** NGRX Selectors */
  productos$!: Observable<Product[]>;
  status$!: Observable<'success' | 'pending' | 'error' | 'loading'>;

  constructor(
    private confirmationService: ConfirmationService,
    private store: Store<DashboardState>,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.apiState$ = this.productService.getAPIState();

    this.store.dispatch(AppActions.loadProducts());

    this.productos$ = this.store.select(getProducts);
    this.status$ = this.store.select(getStatus);

    this.productsStatuses = [
      { label: 'EN STOCK', value: 'EN STOCK' },
      { label: 'STOCK BAJO', value: 'STOCK BAJO' },
      { label: 'SIN STOCK', value: 'SIN STOCK' },
    ];

    this.productService.doAuthenticate();
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
            AppActions.removeProduct({ productId: product.id })
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
          AppActions.updateProduct({ updatedProduct: this.product })
        );
      } else {
        this.product.rating = 0;
        this.product.image = 'product-placeholder.svg';
        this.store.dispatch(
          AppActions.addProduct({ newProduct: this.product })
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
