import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { ProfileService, UserService, User, Product} from '../../core'
import { ActivatedRoute, Router } from '@angular/router';
import { filter,concatMap, tap } from 'rxjs/operators';
import { Filters, Profile } from '../../core';

@Component({
  selector: 'app-profile-follower',
  templateUrl: './profile-follower.component.html',
  styleUrls: ['./profile-follower.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfileFollowersComponent implements OnInit {

  listProducts: Profile[] = [];
  currentUser: User = {} as User;
  username!: String;
  following!: boolean;
  follower!: string[];
  bio!: string;
  image!: string;
  favorites!: string;

  constructor(
    private ProfileService: ProfileService,
    private userService: UserService,
  ) {}


  ngOnInit(): void {
    this.getfollowers();
  }

  getfollowers() {
        this.ProfileService.get_followersUsers( this.currentUser.username).subscribe({
          next: data => {
            this.listProducts = data;
            console.log(this.listProducts = data);
          },
          error: error => console.error(error)
        });
    
  }
}