import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/share/authentication.service';
import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  localStorage.setItem('usuario', JSON.stringify(this.user));
  public static listaCarrito :any[] = [];
  contador;
currentUser: any;
constructor (
  private router: Router,
  private authService:AuthenticationService){
  this.authService.currentUser.subscribe((x)=>(this.currentUser=x))
}
  ngOnInit(): void {
  }

  loguout(){
    this.authService.logout();
    this.router.navigate(['user/login']);
  }
}
