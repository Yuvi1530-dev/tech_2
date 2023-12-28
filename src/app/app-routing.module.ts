import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
const routes: Routes = [{
  path: '',
  loadChildren : () => import('./feature/feature-routing.module').then((m)=>m.FeatureRoutingModule)
  
},]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
