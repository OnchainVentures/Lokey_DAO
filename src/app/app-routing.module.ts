import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'stake',
    loadChildren: () => import('./_pages/stake/stake.module').then( m => m.StakePageModule)
  },
  {
    path: 'ecosystem',
    loadChildren: () => import('./_pages/ecosystem/ecosystem.module').then( m => m.EcosystemPageModule)
  },
  {
    path: 'governance',
    loadChildren: () => import('./_pages/governance/governance.module').then( m => m.GovernancePageModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./_pages/about-us/about-us.module').then( m => m.AboutUsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
