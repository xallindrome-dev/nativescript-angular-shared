import { NgModule } from '@angular/core';
import { ChallengeEditComponent } from './challenge-edit.component';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ChallengeEditComponent }
    ]),
    SharedModule
  ]
})
export class ChallengeEditModule { }
