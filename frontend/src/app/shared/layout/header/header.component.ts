import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, Input} from '@angular/core';
import { Router } from '@angular/router';

import { User, UserService } from '../../../core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
@Input() indicators = false;
  bars: Boolean = false;
  condition:boolean = false;
  constructor(
    // private templateRef: TemplateRef<any>,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {}
 
  currentUser!: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  nav_bars() {
    if (this.bars == false) {
      this.bars = true;
    } else {
      this.bars = false;
    }
  }

}