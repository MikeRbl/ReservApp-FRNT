import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout implements OnInit {
  userRole: string = "";

  constructor(private router: Router){}

  ngOnInit() {
    this.userRole = localStorage.getItem('rol') || '';
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
