import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';
import { UserComponent } from './pages/user/user.component';
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'dashboard/user',
    component: UserComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), DashboardRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
