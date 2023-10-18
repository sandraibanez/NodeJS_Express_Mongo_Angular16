import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core';
import { ToastrService } from 'ngx-toastr';
console.log("auth.component.ts");
@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})

export class AuthComponent implements OnInit {
  authForm: FormGroup;
  authType: String = '';
  title: String = '';
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private UserService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      console.log("authType",this.authType);
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    this.isSubmitting = true;
    const credentials = this.authForm.value;
    console.log("credentials",credentials);
    if (this.authType === 'login') {
      console.log(this.UserService.login(credentials));
      this.UserService.login(credentials).subscribe({
        next: data => {
          this.ToastrService.success("Loged succesfully");
          this.router.navigateByUrl('/');
        },
        error: e => {
          this.ToastrService.error("Wrong password or username, please try again");
          this.isSubmitting = false;
          this.cd.markForCheck();
        }
      })
    } else if (this.authType === 'register') {
      console.log("registro",this.UserService.register(credentials));
      this.UserService.register(credentials).subscribe({
        next: data => {
          if (data.username === undefined) {
            this.ToastrService.error("This user or email is already in use");
            this.isSubmitting = false;
          } else {
            this.ToastrService.success("Registered successfully, please login now");
            setTimeout(() => {
              this.router.navigate(['/auth/login']);
            }, 3000);
          }
        },
        error: e => console.error(e)
      })
    }
  }
}
