import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { Challenge } from './challenge.model';
import { DayStatus, Day } from './day.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService implements OnDestroy {
  private _currentChallenge = new BehaviorSubject<Challenge>(null);
  private userSub: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.userSub = this.authService.user.subscribe(user => {
      if (!user) {
        this._currentChallenge.next(null);
      }
    })
  }

  get currentChallenge() {
    return this._currentChallenge.asObservable();
  }

  fetchCurrentChallenge() {
    return this.authService.user.pipe(
      take(1),
      switchMap(currentUser => {
        if (!currentUser || !currentUser.isAuth) {
          return of(null);
        }

        return this.http
          .get<{
            title: string,
            description: string,
            month: number,
            year: number,
            _days: Day[]
          }>(`https://ns-ng-course-88935.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`);
      }),
      map(resData => {
        if (resData) {
          const loadedChallenge = new Challenge(resData.title, resData.description, resData.year, resData.month, resData._days);
          return loadedChallenge;
        }
        return null;
      }),
      tap(challenge => {
        if (challenge) {
          this._currentChallenge.next(challenge);
        }
      }))
  }

  createNewChallenge(title: string, description: string) {
    const newChallenge = new Challenge(
      title,
      description,
      new Date().getFullYear(),
      new Date().getMonth()
    );

    this._currentChallenge.next(newChallenge);
    return this.saveToServer(newChallenge);
  }

  updateChallenge(title: string, description: string) {
    return this.currentChallenge.pipe(take(1), switchMap(cc => {
      const updatedChallenge = new Challenge(title, description, cc.year, cc.month, cc.days);

      this._currentChallenge.next(updatedChallenge);
      return this.saveToServer(updatedChallenge);
    }));
  }

  updateDayStatus(dayInMonth: number, status: DayStatus) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }

      const dayIndex = challenge.days.findIndex(d => d.dayInMonth == dayInMonth);

      challenge.days[dayIndex].status = status;
      this._currentChallenge.next(challenge);
      console.log(challenge.days[dayIndex]);
      this.saveToServer(challenge)
        .subscribe(res => {
          console.log(res);
        });
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  private saveToServer(challenge: Challenge) {
    return this.authService.user
      .pipe(
        take(1),
        switchMap(currentUser => {
          if (!currentUser || !currentUser.isAuth) {
            return of(null);
          }
          return this.http
            .put(`https://ns-ng-course-88935.firebaseio.com/challenge/${currentUser.id}.json?auth=${currentUser.token}`,
              challenge
            );
        })
      );
  }
}