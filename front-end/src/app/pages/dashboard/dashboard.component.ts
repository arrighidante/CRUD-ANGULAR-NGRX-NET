import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/services/product.service';
import {
  getCurrentProduct,
  getProducts,
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

  statuses!: any[];

  /** NGRX Selectors */
  productos$!: Observable<Product[]>;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private store: Store<DashboardState>,
    private productService: ProductService
  ) {}

  async ngOnInit() {
    this.store.dispatch(AppActions.loadProducts());

    this.productos$ = this.store
      .select(getProducts)
      .pipe(tap((products) => (this.products = products)));

    this.statuses = [
      { label: 'EN STOCK', value: 'EN STOCK' },
      { label: 'STOCK BAJO', value: 'STOCK BAJO' },
      { label: 'SIN STOCK', value: 'SIN STOCK' },
    ];

    this.productService.getProductsAPI().subscribe((data: any) => {
      console.log('Dashboard data', data);
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar los productos seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Hecho',
          detail: 'Productos Eliminados',
          life: 3000,
        });
      },
    });
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
        this.product.id = this.createId();
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

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
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
