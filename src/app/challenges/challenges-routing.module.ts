import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayComponent } from './today/today.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';

const routes: Routes = [
  { path: "today", component: TodayComponent },
  {
    path: "current-challenge",
    component: CurrentChallengeComponent
  },
  {
    path: ":mode",
    loadChildren: () => import('./challenge-edit/challenge-edit.module').then(m => m.ChallengeEditModule)
  },
  { path: "", redirectTo: "/challenges/today", pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChallengesRoutingModule { }
