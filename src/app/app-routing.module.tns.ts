import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { AuthGuard } from './auth/auth.guard';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: "challenges",
    loadChildren: () => import('./challenges/challenges.module').then(m => m.ChallengesModule), // LAZY Loading
    canLoad: [AuthGuard]
  },

  { path: "", redirectTo: '/challenges/tabs', pathMatch: 'full' }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
