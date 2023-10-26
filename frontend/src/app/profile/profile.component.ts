import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User, UserService, Profile, ProfileService } from '../core';
import { concatMap, tap } from 'rxjs/operators';
// import { SharedModule } from '../shared/shared.module';
  
@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileComponent implements OnInit {

    profile: Profile = {} as Profile;
    currentUser: User = {} as User;
    isUser: boolean = false;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private cd: ChangeDetectorRef,
      private profileService: ProfileService,
    ) {}
  
    ngOnInit() {
        this.get_profile();
    }

    get_profile() {
        this.route.data.pipe(
            concatMap((data: { profile?: Profile }) => {
              this.profile = data['profile'] as Profile;
              console.log(this.profile);
              // Load the current user's data.
              return this.userService.currentUser.pipe(tap(
                (userData: User) => {
                  this.currentUser = userData;
                  console.log(this.currentUser.image);
                  this.isUser = (this.currentUser.username === this.profile.username);
                }
              ));
            })
          ).subscribe((() => {
            this.cd.markForCheck();
          }));
    }

    logout() {
        this.userService.purgeAuth();
        this.router.navigateByUrl('/');
    }

    onToggleFollowing(following: boolean) {
        console.log('this.profile',this.profile);
        this.profile.following = following;
    }
}
