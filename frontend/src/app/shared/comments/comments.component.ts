import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment, User, UserService } from '../../core';
  
@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
  
export class CommentsComponent implements OnInit {

    @Input() comment!: Comment;
    @Output() deleteComment = new EventEmitter<boolean>();

    canModify: boolean = false;
    subscription!: Subscription;

    constructor(
      private userService: UserService,
      private cd: ChangeDetectorRef
    ) {}
  
    ngOnInit() {
        this.subscription = this.userService.currentUser.subscribe(
            (userData: User) => {
                this.canModify = userData.username === this.comment.author.username;
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