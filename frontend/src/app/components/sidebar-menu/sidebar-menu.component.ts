import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Drawer } from 'primeng/drawer';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [NgIf, Drawer],
  templateUrl: './sidebar-menu.component.html',
  styleUrl: './sidebar-menu.component.css'
})
export class SidebarMenuComponent {
  @Input() isAdmin = false;
  visible = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.visible = !this.visible;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.visible = false;
  }
}
