import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ChallengeService } from '../challenge.service';
import { take, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html'
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true;
  title: string = '';
  description: string = '';
  isLoading: boolean = false;

  constructor(
    private activatedRoutes: ActivatedRoute,
    private router: Router,
    private challengeService: ChallengeService
  ) { }

  ngOnInit() {
    this.activatedRoutes.paramMap.subscribe(paramMap => {
      if (!paramMap.has("mode")) {
        this.isCreating = true;
      } else {
        this.isCreating = paramMap.get("mode") !== 'edit';
      }

      if (!this.isCreating) {
        this.challengeService.currentChallenge
          .pipe(take(1),
            switchMap(curChallenge => {
              if (!curChallenge) {
                this.isLoading = true;
                return this.challengeService.fetchCurrentChallenge();
              }
              return of(curChallenge);
            }))
          .subscribe(cc => {
            if (cc) {
              this.title = cc.title;
              this.description = cc.description;
            }
            this.isLoading = false;
          })
      } else {
        this.title = '';
        this.description = '';
      }
    });
  }

  onSubmit(title: string, desc: string) {
    if (this.isCreating) {
      this.challengeService
        .createNewChallenge(title, desc)
        .subscribe(cc => {
          this.router.navigate(['/challenges/current-challenge']);
        });
    } else {
      this.challengeService
        .updateChallenge(title, desc)
        .subscribe(cc => {
          this.router.navigate(['/challenges/current-challenge']);
        });
    }
  }
}
