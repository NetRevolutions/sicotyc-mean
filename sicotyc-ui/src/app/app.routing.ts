import { NgModule } from '@angular/core';
import { ExtraOptions, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { Error500Component } from './error/error-500/error-500.component';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: Error500Component},
];

// const routerConfig: ExtraOptions = {
//   preloadingStrategy        : PreloadAllModules,
//   scrollPositionRestoration : 'enabled'
// };

@NgModule({
  imports: [
    RouterModule.forRoot(routes), //, routerConfig
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule]
})
export class AppRoutingModule {}