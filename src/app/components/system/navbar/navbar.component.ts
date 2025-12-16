import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavItem } from '../../../interfaces/navitem';
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor (
    private auth: AuthService
  ) {}

  navItems: NavItem[] = [];

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(res => {
      this.isLoggedIn = res;
      if (this.isLoggedIn) {
        this.isAdmin = this.auth.isAdmin();
        this.setupMenu(true);
      } else {
        this.setupMenu(false);
      }
    })
  }

  setupMenu(isLoggedIn: boolean) {
    this.navItems = [
      {
        name: 'Otthon',
        url: 'home',
        icon: 'bi-house-fill'
      },

      ...(isLoggedIn) ? [
        
        ...(this.isAdmin) ? [
          {
            name: 'Szállás feltöltés',
            url: 'szallasupload',
            icon: 'bi-plus-circle'
          },
          {
            name: 'Szállások kezelése',
            url: 'szallaslist',
            icon: 'bi-pencil'
          },
          {
            name: 'Felhasználók kezelése',
            url: 'manageusers',
            icon: 'bi-person-fill-gear'
          }
        ] : [],
        {
          name: 'Kilépés',
          url: 'logout',
          icon: 'bi-door-open'
        },
      ] : [
        {
          name: 'Regisztráció',
          url: 'registration',
          icon: 'bi-person-add'
        },
        {
          name: 'Belépés',
          url: 'login',
          icon: 'bi-box-arrow-right'
        },
      ]
    ]
  }
}
