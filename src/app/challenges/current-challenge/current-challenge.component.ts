import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { ChallengeService } from "../challenge.service";
import { Challenge } from "../challenge.model";
import { Day, DayStatus } from "../day.model";
import { Router } from "@angular/router";

@Component({
    selector: 'ns-current-challenge',
    templateUrl: './current-challenge.component.html',
    styleUrls: [
        './current-challenge.component.scss'
    ]
})
export class CurrentChallengeComponent implements OnInit, OnDestroy {
    weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    currentChallenge: Challenge;
    isLoading: boolean = false;
    selectedDay: Day;
    private currChallengeSub: Subscription;

    constructor(
        private router: Router,
        private challengeService: ChallengeService) { }

    ngOnInit() {
        this.currChallengeSub = this.challengeService.currentChallenge.subscribe(cc => {
            console.log("Testing Current CHallenge Sub", cc);
            this.currentChallenge = cc;
        });

        this.isLoading = true;

        this.challengeService.fetchCurrentChallenge().subscribe(res => {
            console.log('Fetched challenge');
            this.isLoading = false;
        }, err => {
            console.log(err);
            this.isLoading = false;
        });
    }

    getIsSettable(dayInMonth: number) {
        return dayInMonth <= new Date().getDate();
    }

    getRow(index: number, day: { dayInMonth: number, dayInWeek: number }) {
        const startRow = 2;
        const weekRow = Math.floor(index / 7);
        const firstWeekDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).getDay();
        const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;
        console.log("GetRow: ", startRow + weekRow + irregularRow);

        return startRow + weekRow + irregularRow;
    }

    onChangeStatus(day: Day) {
        if (!this.getIsSettable(day.dayInMonth)) {
            console.log("No status changed");
            return;
        }
        this.selectedDay = day;
    }

    onRouteAction(route: string) {
        if (route === "add") {
            this.router.navigate(['/challenges/replace'])
        } else {
            this.router.navigate(['/challenges/edit'])
        }
    }

    onUpdateState(selectedStatus: DayStatus) {
        if (selectedStatus === DayStatus.Open) {
            this.selectedDay = null;
            return;
        }
        this.challengeService.updateDayStatus(this.selectedDay.dayInMonth, selectedStatus);
        this.selectedDay = null;
    }

    ngOnDestroy() {
        if (this.currChallengeSub) {
            this.currChallengeSub.unsubscribe();
        }
    }
}