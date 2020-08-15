import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styles: [],
})
export class UserIndexComponent implements OnInit {
  constructor(public router: Router) { }

  ngOnInit(): void { }
}
