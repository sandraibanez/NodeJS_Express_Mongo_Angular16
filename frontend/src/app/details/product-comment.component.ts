import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

import { Comment, User, UserService } from '../core';
import { Subscription } from 'rxjs';
console.log("userData");
@Component({
  selector: 'app-product-comment',
  templateUrl: './product-comment.component.html',
  styleUrls: ['./product-comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class productCommentComponent implements OnInit, OnDestroy {
  
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef
  ) {}

  private subscription!: Subscription;

  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify!: boolean;

  ngOnInit() {
    console.log("userData");
    // Load the current user's data
    this.subscription = this.userService.currentUser.subscribe(
      (userData: User) => {
        this.canModify = (userData.username === this.comment.author.username);
        console.log("canModify",this.canModify);
        this.cd.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked() {
    this.deleteComment.emit(true);
  }


}
