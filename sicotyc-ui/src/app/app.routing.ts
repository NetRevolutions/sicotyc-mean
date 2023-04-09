import { Route } from "@angular/router";
import { InitialDataResolver } from "./app.resolvers";
import { LayoutComponent } from "./layout/layout.component";

export const appRoutes: Route[] = [
    // Redirect empty path to '/home'
  {path: '', pathMatch: 'full', redirectTo: 'home'},

  // Redirect signed-in user to the '/home'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'home'},

  // Auth routes for guests
  {
    path: '',
    //canMatch: [NoAuthGuard], //TODO: Pending implement
    component: LayoutComponent,
    data: {
      //TODO: Pending implement
    },
    children: [
      {path: 'confirmation-required', loadChildren: () => import('./modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
      {path: 'forgot-password', loadChildren: () => import('./modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
      {path: 'reset-password', loadChildren: () => import('./modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
      {path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
      {path: 'sign-up', loadChildren: () => import('./modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
    ]
  },

  // Auth routes for authenticated users
  {
    path: '',
    //canMatch: [AuthGuard], //TODO: Pending implement
    component: LayoutComponent,
    data: {
      //TODO: Pending implement
    },
    children: [
      {path: 'sign-out', loadChildren: () => import('./modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
      {path: 'unlock-session', loadChildren: () => import('./modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
    ]
  },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      //TODO: Pending implement
    },
    children: [
      {path: 'home', loadChildren: () => import('./modules/landing/home/home.module').then(m => m.LandingHomeModule)},
    ]
  },

  // Admin routes
  {
    path: '',
    //canMatch: [AuthGuard], //TODO: Pending implement
    component: LayoutComponent,
    resolve: {
      //initialData: InitialDataResolver
    },
    children: [
      // Dashboards

      // Apps

      // Pages
      {path: 'pages', children: [

        // Rate Calculation
        {path: 'calculo-tarifas', children: [
          {path: 'lima-callao', loadChildren: () => import('./modules/admin/pages/rate-calculation/lima-callao/lima-callao.module').then(m => m.RateCalculationLimaCallaoModule)},
          {path: 'provincia', loadChildren: () => import('./modules/admin/pages/rate-calculation/province/province.module').then(m => m.ProvinceModule)}
        ]},

        // Error
        {path: 'error', children: [
          {path: '404', loadChildren: () => import('./modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
          {path: '500', loadChildren: () => import('./modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)}
        ]}
      ]},

      // 404 & Catch all
      {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('./modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
      {path: '**', redirectTo: '404-not-found'}
    ]
  }
];
