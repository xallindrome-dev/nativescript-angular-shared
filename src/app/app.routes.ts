import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/challenges/today',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'challenges',
    loadChildren: () => import('./challenges/challenges.module').then(m => m.ChallengesModule),
    canLoad: [AuthGuard]
  }
];
