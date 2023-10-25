import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';

@Injectable()
export class CustomerService extends BaseService {
  getData() {
    return [
      {
        id: 1000,
        name: 'James Butt',
        country: {
          name: 'Algeria',
          code: 'dz',
        },
        company: 'Benton, John B Jr',
        date: '2015-09-13',
        status: 'unqualified',
        verified: true,
        getHiredChance: 17,
        representative: {
          name: 'Ioni Bowcher',
          image: 'ionibowcher.png',
        },
        balance: 70663,
      },
      {
        id: 1001,
        name: 'Josephine Darakjy',
        country: {
          name: 'Egypt',
          code: 'eg',
        },
        company: 'Chanay, Jeffrey A Esq',
        date: '2019-02-09',
        status: 'proposal',
        verified: true,
        getHiredChance: 0,
        representative: {
          name: 'Amy Elsner',
          image: 'amyelsner.png',
        },
        balance: 82429,
      },
      {
        id: 1002,
        name: 'Art Venere',
        country: {
          name: 'Panama',
          code: 'pa',
        },
        company: 'Chemel, James L Cpa',
        date: '2017-05-13',
        status: 'qualified',
        verified: false,
        getHiredChance: 63,
        representative: {
          name: 'Asiya Javayant',
          image: 'asiyajavayant.png',
        },
        balance: 28334,
      },
      {
        id: 1003,
        name: 'Lenna Paprocki',
        country: {
          name: 'Slovenia',
          code: 'si',
        },
        company: 'Feltz Printing Service',
        date: '2020-09-15',
        status: 'new',
        verified: false,
        getHiredChance: 37,
        representative: {
          name: 'Xuxue Feng',
          image: 'xuxuefeng.png',
        },
        balance: 88521,
      },
      {
        id: 1004,
        name: 'Donette Foller',
        country: {
          name: 'South Africa',
          code: 'za',
        },
        company: 'Printing Dimensions',
        date: '2016-05-20',
        status: 'proposal',
        verified: true,
        getHiredChance: 33,
        representative: {
          name: 'Asiya Javayant',
          image: 'asiyajavayant.png',
        },
        balance: 93905,
      },
    ];
  }

  getCustomersMini() {
    return Promise.resolve(this.getData().slice(0, 5));
  }

  getCustomersSmall() {
    return Promise.resolve(this.getData().slice(0, 10));
  }

  getCustomersMedium() {
    return Promise.resolve(this.getData().slice(0, 50));
  }

  getCustomersLarge() {
    return Promise.resolve(this.getData().slice(0, 200));
  }

  getCustomersXLarge() {
    return Promise.resolve(this.getData());
  }

  getCustomers(params?: any) {
    return this.http
      .get<any>('https://www.primefaces.org/data/customers', { params: params })
      .toPromise();
  }
}
