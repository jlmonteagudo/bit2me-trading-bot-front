import { Component, ElementRef } from '@angular/core';
import { Menu, NavService } from '../../services/nav.service';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { TabToTopComponent } from '../../components/tab-to-top/tab-to-top.component';
@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    TabToTopComponent,
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss',
})
export class ContentLayoutComponent {
  public menuItems!: Menu[];

  constructor(public navServices: NavService, private elementRef: ElementRef) {
    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
    });
  }
  clearToggle() {
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
    html?.setAttribute('data-toggled', 'close');
    document.querySelector('#responsive-overlay')?.classList.remove('active');
  }
  togglesidemenuBody() {
    if (localStorage.getItem('ynex-sidemenu-styles') == 'icontext') {
      document.documentElement.removeAttribute('icon-text');
    }
    if (
      document.documentElement.getAttribute('data-nav-layout') ==
        'horizontal' &&
      window.innerWidth > 992
    ) {
      this.closeMenu();
    }
    let html = this.elementRef.nativeElement.ownerDocument.documentElement;
    if (window.innerWidth <= 992) {
      html?.setAttribute(
        'data-toggled',
        html?.getAttribute('data-toggled') == 'close' ? 'close' : 'close'
      );
    }
  }
  closeMenu() {
    this.menuItems?.forEach((a: any) => {
      if (this.menuItems) {
        a.active = false;
      }
      a?.children?.forEach((b: any) => {
        if (a.children) {
          b.active = false;
        }
      });
    });
  }
}
