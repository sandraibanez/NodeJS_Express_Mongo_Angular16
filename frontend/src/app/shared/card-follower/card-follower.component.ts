import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, AfterViewChecked } from '@angular/core';
import { Product, Profile, User } from 'src/app/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core';

@Component({
  selector: 'app-card-follower',
  templateUrl: './card-follower.component.html',
  styleUrls: ['./card-follower.component.scss']
})

export class CardFollowerComponent implements OnInit{


  @Input() profile!: Profile;

  @Output() deleteProfileId = new EventEmitter<String>();

  username: String | undefined;

  constructor() { }

  ngOnInit(): void { 
    console.log('hola');
    if(typeof this.profile.username !== "undefined"){
      this.username = this.profile.username[0];
    } else if(typeof this.profile.username == "undefined"){
      console.log('error de imagen product');
    }
  }

}