import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChallengeService } from '../challenge.service';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: [
    './challenge-tabs.component.css'
  ]
})
export class ChallengeTabsComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private router: Router, private active: ActivatedRoute, private challengeService: ChallengeService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.challengeService.fetchCurrentChallenge().subscribe(res => {
      console.log('Fetched challenge');
      this.isLoading = false;
      this.loadTabRoutes();
    }, err => {
      console.log(err);
      this.isLoading = false;
      this.loadTabRoutes();
    });
  }

  private loadTabRoutes() {
    setTimeout(() => {
      this.router.navigate(
        [
          {
            outlets: {
              currentChallenge: ['current-challenge'],
              today: ['today']
            }
          }
        ],
        {
          relativeTo: this.active
        }
      );
    }, 10)
  }
}
