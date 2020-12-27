import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@src/app/auth/auth.service';

@Component({
  selector: 'ns-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  @Input() title: string = 'NS';
  @Input() hasChallenge: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void { }

  onLogout() {
    this.authService.logout();
  }
}
