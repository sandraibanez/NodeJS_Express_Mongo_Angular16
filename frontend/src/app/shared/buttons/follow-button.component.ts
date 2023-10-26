import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { Profile, ProfileService, UserService} from 'src/app/core';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FollowButtonComponent {
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  @Input() profile!: Profile;
  // @Input() product!: Product;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;
  
  toggleFollowing() {
    
    console.log("profile",this.profile);
    this.isSubmitting = true;
    // TODO: remove nested subscribes, use mergeMap
    // console.log(this.product.name);
    this.userService.isAuthenticated.pipe(concatMap(
      (authenticated) => {
        // Not authenticated? Push to login screen
        console.log("authenticated",authenticated);
        if (!authenticated) {
          this.router.navigateByUrl('/auth/login');
          return of(null);
        }
        // const auth = this.product.author;
        // Follow this profile if we aren't already
        console.log("this.profile.username",this.profile.username);
        if (!this.profile.following) {
          return this.profileService.follow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(true);
            },
            err => this.isSubmitting = false
          ));

        // Otherwise, unfollow this profile
        } else {
          return this.profileService.unfollow(this.profile.username)
          .pipe(tap(
            data => {
              this.isSubmitting = false;
              this.toggle.emit(false);
            },
            err => this.isSubmitting = false
          ));
        }
      }
    )).subscribe(() => {
      this.cd.markForCheck();
    });
   }
}
