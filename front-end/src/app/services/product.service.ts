import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  products: Product[] = [];

  /** Returns an array of Product objects.
   * @returns {Product[]} Array of Product objects.
   */
  getProductsData(): Product[] {
    return [
      {
        id: '1000',
        code: 'f230fh0g3',
        name: 'Bamboo Watch',
        description: 'Product Description',
        image: 'bamboo-watch.jpg',
        price: 65,
        category: 'Accesorios',
        quantity: 24,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1001',
        code: 'nvklal433',
        name: 'Black Watch',
        description: 'Product Description',
        image: 'black-watch.jpg',
        price: 72,
        category: 'Accesorios',
        quantity: 61,
        inventoryStatus: 'SIN STOCK',
        rating: 4,
      },
      {
        id: '1002',
        code: 'zz21cz3c1',
        name: 'Blue Band',
        description: 'Product Description',
        image: 'blue-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 2,
        inventoryStatus: 'STOCK BAJO',
        rating: 3,
      },
      {
        id: '1003',
        code: '244wgerg2',
        name: 'Blue T-Shirt',
        description: 'Product Description',
        image: 'blue-t-shirt.jpg',
        price: 29,
        category: 'Vestimenta',
        quantity: 25,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1004',
        code: 'h456wer53',
        name: 'Bracelet',
        description: 'Product Description',
        image: 'bracelet.jpg',
        price: 15,
        category: 'Accesorios',
        quantity: 73,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1005',
        code: 'av2231fwg',
        name: 'Brown Purse',
        description: 'Product Description',
        image: 'brown-purse.jpg',
        price: 120,
        category: 'Accesorios',
        quantity: 0,
        inventoryStatus: 'SIN STOCK',
        rating: 4,
      },
      {
        id: '1006',
        code: 'bib36pfvm',
        name: 'Chakra Bracelet',
        description: 'Product Description',
        image: 'chakra-bracelet.jpg',
        price: 32,
        category: 'Accesorios',
        quantity: 5,
        inventoryStatus: 'STOCK BAJO',
        rating: 3,
      },
      {
        id: '1007',
        code: 'mbvjkgip5',
        name: 'Galaxy Earrings',
        description: 'Product Description',
        image: 'galaxy-earrings.jpg',
        price: 34,
        category: 'Accesorios',
        quantity: 23,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1008',
        code: 'vbb124btr',
        name: 'Game Controller',
        description: 'Product Description',
        image: 'game-controller.jpg',
        price: 99,
        category: 'Electronica',
        quantity: 2,
        inventoryStatus: 'STOCK BAJO',
        rating: 4,
      },
      {
        id: '1009',
        code: 'cm230f032',
        name: 'Gaming Set',
        description: 'Product Description',
        image: 'gaming-set.jpg',
        price: 299,
        category: 'Electronica',
        quantity: 63,
        inventoryStatus: 'EN STOCK',
        rating: 3,
      },
      {
        id: '1010',
        code: 'plb34234v',
        name: 'Gold Phone Case',
        description: 'Product Description',
        image: 'gold-phone-case.jpg',
        price: 24,
        category: 'Accesorios',
        quantity: 0,
        inventoryStatus: 'SIN STOCK',
        rating: 4,
      },
      {
        id: '1011',
        code: '4920nnc2d',
        name: 'Green Earbuds',
        description: 'Product Description',
        image: 'green-earbuds.jpg',
        price: 89,
        category: 'Electronica',
        quantity: 23,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1012',
        code: '250vm23cc',
        name: 'Green T-Shirt',
        description: 'Product Description',
        image: 'green-t-shirt.jpg',
        price: 49,
        category: 'Vestimenta',
        quantity: 74,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1013',
        code: 'fldsmn31b',
        name: 'Grey T-Shirt',
        description: 'Product Description',
        image: 'grey-t-shirt.jpg',
        price: 48,
        category: 'Vestimenta',
        quantity: 0,
        inventoryStatus: 'SIN STOCK',
        rating: 3,
      },
      {
        id: '1014',
        code: 'waas1x2as',
        name: 'Headphones',
        description: 'Product Description',
        image: 'headphones.jpg',
        price: 175,
        category: 'Electronica',
        quantity: 8,
        inventoryStatus: 'STOCK BAJO',
        rating: 5,
      },
      {
        id: '1015',
        code: 'vb34btbg5',
        name: 'Light Green T-Shirt',
        description: 'Product Description',
        image: 'light-green-t-shirt.jpg',
        price: 49,
        category: 'Vestimenta',
        quantity: 34,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1016',
        code: 'k8l6j58jl',
        name: 'Lime Band',
        description: 'Product Description',
        image: 'lime-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 12,
        inventoryStatus: 'EN STOCK',
        rating: 3,
      },
      {
        id: '1017',
        code: 'v435nn85n',
        name: 'Mini Speakers',
        description: 'Product Description',
        image: 'mini-speakers.jpg',
        price: 85,
        category: 'Vestimenta',
        quantity: 42,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1018',
        code: '09zx9c0zc',
        name: 'Painted Phone Case',
        description: 'Product Description',
        image: 'painted-phone-case.jpg',
        price: 56,
        category: 'Accesorios',
        quantity: 41,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1019',
        code: 'mnb5mb2m5',
        name: 'Pink Band',
        description: 'Product Description',
        image: 'pink-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 63,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1020',
        code: 'r23fwf2w3',
        name: 'Pink Purse',
        description: 'Product Description',
        image: 'pink-purse.jpg',
        price: 110,
        category: 'Accesorios',
        quantity: 0,
        inventoryStatus: 'SIN STOCK',
        rating: 4,
      },
      {
        id: '1021',
        code: 'pxpzczo23',
        name: 'Purple Band',
        description: 'Product Description',
        image: 'purple-band.jpg',
        price: 79,
        category: 'Fitness',
        quantity: 6,
        inventoryStatus: 'STOCK BAJO',
        rating: 3,
      },
      {
        id: '1022',
        code: '2c42cb5cb',
        name: 'Purple Gemstone Necklace',
        description: 'Product Description',
        image: 'purple-gemstone-necklace.jpg',
        price: 45,
        category: 'Accesorios',
        quantity: 62,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1023',
        code: '5k43kkk23',
        name: 'Purple T-Shirt',
        description: 'Product Description',
        image: 'purple-t-shirt.jpg',
        price: 49,
        category: 'Vestimenta',
        quantity: 2,
        inventoryStatus: 'STOCK BAJO',
        rating: 5,
      },
      {
        id: '1024',
        code: 'lm2tny2k4',
        name: 'Shoes',
        description: 'Product Description',
        image: 'shoes.jpg',
        price: 64,
        category: 'Vestimenta',
        quantity: 0,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1025',
        code: 'nbm5mv45n',
        name: 'Sneakers',
        description: 'Product Description',
        image: 'sneakers.jpg',
        price: 78,
        category: 'Vestimenta',
        quantity: 52,
        inventoryStatus: 'EN STOCK',
        rating: 4,
      },
      {
        id: '1026',
        code: 'zx23zc42c',
        name: 'Teal T-Shirt',
        description: 'Product Description',
        image: 'teal-t-shirt.jpg',
        price: 49,
        category: 'Vestimenta',
        quantity: 3,
        inventoryStatus: 'STOCK BAJO',
        rating: 3,
      },
      {
        id: '1027',
        code: 'acvx872gc',
        name: 'Yellow Earbuds',
        description: 'Product Description',
        image: 'yellow-earbuds.jpg',
        price: 89,
        category: 'Electronica',
        quantity: 35,
        inventoryStatus: 'EN STOCK',
        rating: 3,
      },
      {
        id: '1028',
        code: 'tx125ck42',
        name: 'Yoga Mat',
        description: 'Product Description',
        image: 'yoga-mat.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 15,
        inventoryStatus: 'EN STOCK',
        rating: 5,
      },
      {
        id: '1029',
        code: 'gwuby345v',
        name: 'Yoga Set',
        description: 'Product Description',
        image: 'yoga-set.jpg',
        price: 20,
        category: 'Fitness',
        quantity: 25,
        inventoryStatus: 'EN STOCK',
        rating: 8,
      },
    ];
  }

  /** Deletes a product with the given ID from the list of products.
   * @param id The ID of the product to delete.
   * @returns An observable that resolves to an object with a status and message indicating the result of the operation.
   */
  deleteProduct(id: string) {
    const index = this.products.findIndex((product) => product.id === id);
    this.products = this.products.filter((p) => p.id !== id);
    return of({ status: 'ok', message: 'Product deleted successfully' });
  }

  /** Updates a product in the list of products.
   * @param product - The product to be updated.
   * @returns An Observable with a status and message indicating the success of the operation.
   */
  updateProduct(product: Product) {
    const updatedProducts = this.products.map((p) => {
      if (p.id === product.id) {
        return { ...p, ...product };
      } else {
        return p;
      }
    });
    this.products = updatedProducts;
    return of({ status: 'ok', message: 'Product updated successfully' });
  }

  /** Adds a new product to the list of products.
   * @param product - The product to be added.
   * @returns An observable with a status and message indicating the success of the operation.
   */
  addProduct(product: Product) {
    this.products = [...this.products, product];
    return of({ status: 'ok', message: 'Product added successfully' });
  }

  /** Returns an observable of an array of products.
   * If the products have already been fetched, returns them from memory.
   * Otherwise, fetches the products and returns them.
   * @returns An observable of an array of products.
   */
  getProducts(): Observable<Product[]> {
    if (this.products && this.products.length > 0) {
      return of(this.products);
    } else {
      this.products = this.getProductsData();
      return of(this.products);
    }
  }
}
