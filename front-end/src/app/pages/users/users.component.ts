//#region Imports

import { Component, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Table } from 'primeng/table';
import { Agente, User } from 'src/app/interfaces/user.interface';
import { CustomerService } from 'src/app/services/user.service';
import { UtilsPrimengModule } from 'src/app/shared/utils-primeng/utils-primeng.module';

//#endregion

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  imports: [UtilsPrimengModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  providers: [CustomerService],
})
export class UsersComponent {
  @ViewChild('dt') usersTable!: Table;
  users!: User[];
  selectedUser!: User;
  selectedUsers!: User[];

  representatives!: Agente[];

  statuses!: any[];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  userDialog: boolean = false;

  // FIXME: Move this to the formService and complete with the rest of the fields and validators
  userForm: FormGroup = new FormGroup({
    name: new FormControl(null, {
      validators: Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.pattern('[^()0-9]*'),
      ]),
      updateOn: 'blur',
    }),
    getHiredChance: new FormControl(null),
    status: new FormControl(null, {
      validators: Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(25),
      ]),
      updateOn: 'blur',
    }),
    date: new FormControl(null, {
      validators: Validators.compose([
        Validators.pattern(
          /^(((0)[0-9])|((1)[0-2]))(\/)([0-2][0-9]|(3)[0-1])(\/)\d{4}$/
        ),
      ]),
      updateOn: 'blur',
    }),
    balance: new FormControl(null, {
      validators: Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(20),
        ,
      ]),
      updateOn: 'blur',
    }),
  });

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      this.users = customers;
      this.loading = false;

      this.users.forEach(
        (customer) => (customer.date = new Date(<Date>customer.date))
      );
    });

    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];

    this.statuses = [
      { label: 'No califica', value: 'unqualified' },
      { label: 'Calificado', value: 'qualified' },
      { label: 'Nuevo', value: 'new' },
      { label: 'Negociación', value: 'negotiation' },
      { label: 'Renovación', value: 'renewal' },
      { label: 'Propuesta', value: 'proposal' },
    ];
  }

  onSearchInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.usersTable.filterGlobal(target.value, 'contains');
  }

  getSeverity(status: string) {
    switch (status) {
      case 'unqualified':
        return 'danger';

      case 'qualified':
        return 'success';

      case 'new':
        return 'info';

      case 'negotiation':
        return 'warning';

      case 'renewal':
        return 'default';
      default:
        return '';
    }
  }

  getStatusLabel(status: string) {
    const statusObj = this.statuses.find((s) => s.value === status);
    return statusObj ? statusObj.label : '';
  }

  editUser(user: User) {
    this.selectedUser = { ...user };
    this.userForm.patchValue(this.selectedUser);
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
    // this.submitted = false;
    // this.store.dispatch(AppActions.clearCurrentProduct());
  }

  saveProduct() {
    // this.submitted = true;

    if (this.selectedUser && this.selectedUser.name?.trim()) {
      if (this.selectedUser.id) {
        // FIXME: Action to update user
        // this.store.dispatch(
        //   UserActions.updateUser({
        //     updatedUser: this.selectedUser,
        // })
        // );
      } else {
        this.selectedUser.balance = 0;
        // FIXME: Action to add user
        // this.store.dispatch(
        //   UserActions.addUser({ newUser: this.selectedUser })
        // );
      }

      this.userDialog = false;
      // this.store.dispatch(AppActions.clearCurrentUser);
      this.selectedUser = {};
    }
  }
}
