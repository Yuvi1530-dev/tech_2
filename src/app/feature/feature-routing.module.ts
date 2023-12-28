import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MoveListComponent } from './move-list/move-list.component';
import { RigisterComponent } from './rigister/rigister.component';
import { CombineComponent } from '../_layout/combine/combine.component'
import { AuthGuard } from '../service/auth.guard';
const routes: Routes = [
  {
    path: '',
    component: CombineComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
        data: { title: 'JITO | Jain International Trade Organization, Bangalore' }
      },
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        data: { title: 'JITO | Jain International Trade Organization, Bangalore' }
      },
    ]
  }, {
    path: '',
    children: [
      {
        path: 'Register',
        component: RigisterComponent,
        pathMatch: 'full',
        data: { title: 'JITO | Jain International Trade Organization, Bangalore' }
      },
    ]
  },
  {
    path: '',
    component: CombineComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: 'moveList',
        component: MoveListComponent,
        pathMatch: 'full',
        data: { title: 'JITO | Jain International Trade Organization, Bangalore' }
      },
    ]
  },
  {
    path: '',
    component: CombineComponent,
    canActivate : [AuthGuard],
    children: [
      {
        path: 'contact_us',
        component: ContactComponent,
        pathMatch: 'full',
        data: { title: 'JITO | Jain International Trade Organization, Bangalore' }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
