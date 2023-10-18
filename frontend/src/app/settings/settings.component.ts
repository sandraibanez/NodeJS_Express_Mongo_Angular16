import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { User, UserService } from '../core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SettingsComponent implements OnInit {

  settingsForm: FormGroup;
  isSubmitting = false;
  user: User = {} as User;
  errors: Object = {};

  constructor(private UserService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    this.settingsForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'image': ['', Validators.required],
      'bio': ['', Validators.required],
      'email': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Make a fresh copy of the current user's object to place in editable form fields
    Object.assign(this.user, this.UserService.getCurrentUser());
    // Fill the form
    this.settingsForm.patchValue(this.user);
  }
  
  logout() {
    this.UserService.purgeAuth();
    this.router.navigateByUrl('/');
  }
  
  submitForm() {
    this.isSubmitting = true;
    // update the model
    this.updateUser(this.settingsForm.value);
    console.log("setting",this.user);
    
    this.UserService.update(this.user).subscribe({
      next: data => {
        this.ToastrService.success("Updated correctly");
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 2000)
        console.log(data);
      },
      error: e => { console.log('error'); }
    })
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}